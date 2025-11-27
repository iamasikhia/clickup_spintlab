from urllib import response
from fastapi import APIRouter, Request, Depends, HTTPException, Query
from fastapi.responses import RedirectResponse, JSONResponse
import os, secrets, requests, logging, supabase
from dotenv import load_dotenv
from supabase import create_client, Client
from app.auth.main_new import current_active_user
from cryptography.fernet import Fernet
from app.db.models import User
from sqlalchemy.engine import URL
from urllib.parse import urlencode

load_dotenv()

# router object
router = APIRouter(prefix = "/clickup", tags = ["ClickUp"])

# secure logger
logger = logging.getLogger("clickup")
logger.setLevel(logging.INFO)

CLICKUP_API_TOKEN = os.getenv("CLICKUP_API_TOKEN")
CLICKUP_CLIENT_ID = os.getenv("CLICKUP_CLIENT_ID")
CLICKUP_CLIENT_SECRET = os.getenv("CLICKUP_CLIENT_SECRET")
CLICKUP_REDIRECT_URI = os.getenv("CLICKUP_REDIRECT_URI")
FERNET_KEY = os.getenv("FERNET_KEY")
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
RLS_KEY = os.getenv("SUPABASE_RLS_POLICY_KEY")

fernet = Fernet(FERNET_KEY)
supabase: Client = create_client(SUPABASE_URL, RLS_KEY)

def encrypt_token(token: str) -> str:
    # encrypt ClickUp access token before db
    return fernet.encrypt(token.encode()).decode()

def decrypt_token(token_enc: str) -> str:
    ## decrypt ClickUp access token before API
    return fernet.decrypt(token_enc.encode()).decode()

def generate_state():
    # generate a random state to ensure secure tokens
    return secrets.token_urlsafe(32)

def require_project_leader(user = Depends(current_active_user)):
    if user.role != "project_leader":
        raise HTTPException(status_code = 403, detail = "Not authorized")
    return user

@router.get("/test")
async def clickup_test(user: User = Depends(current_active_user)):
    res = supabase.table("clickup_tokens").select("access_token").eq("user_id", str(user.id)).execute()
    if not res.data:
        raise HTTPException(status_code = 500, detail = "Missing ClickUp token")
    
    token_encrypted = res.data[0]["access_token"]
    token = fernet.decrypt(token_encrypted.encode()).decode()

    headers = {"Authorization": f"Bearer {token}"}

    try:
        response = requests.get("https://api.clickup.com/api/v2/team", headers = headers, timeout = 10)
        response.raise_for_status()
    
    except requests.RequestException as e:
        raise HTTPException(status_code = 502, detail = f"ClickUp API request failed: {e}")

    return {"status": "success",
            "data": response.json()}
            
# now render Connect ClickUp button to call /clickup/auth

@router.get("/auth")
def authorize_clickup(user: User = Depends(current_active_user)):
    # endpoint triggered when user clicks Connect to ClickUp
    state = generate_state()
    supabase.table("oauth_states").insert(
        {
            "state": state, 
            "user_id": str(user.id)
        }
        ).execute()
    
    query_params = {
        "client_id": CLICKUP_CLIENT_ID,
        "redirect_uri": CLICKUP_REDIRECT_URI,
        "state": state,
        "response_type": "code"
    }

    auth_url = f"https://app.clickup.com/api?{urlencode(query_params)}"
    return {"auth_url" : auth_url}

# oauth callback - exchange code for token
@router.get("/oauth/callback")
async def clickup_oauth_callback(
    code: str = Query(...),
    state: str = Query(...)
):

    res = supabase.table("oauth_states").select("user_id").eq("state", state).single().execute()
    if not res.data:
        raise HTTPException(status_code = 400, detail = "Invalid state")
    
    user_id = res.data["user_id"]

    token_url = "https://api.clickup.com/api/v2/oauth/token"
    
    payload = {
        "client_id": CLICKUP_CLIENT_ID,
        "client_secret": CLICKUP_CLIENT_SECRET,
        "code": code,
        "redirect_uri": CLICKUP_REDIRECT_URI,
    }

    try:
        response = requests.post(token_url, json = payload, timeout = 10)
        response.raise_for_status()
        data = response.json()
    except requests.RequestException as e:
        logger.error(f"Token exchange failed: {e}")
        raise HTTPException(status_code = 502, detail = "Failed to connect to ClickUp")

    access_token = data.get("access_token")

    if not access_token:
        logger.error(f"Invalid token response: {data}")
        raise HTTPException(status_code = 400, detail = "Missing access token from ClickUp")

    encrypted_token = fernet.encrypt(access_token.encode()).decode()
    # must make sure this complies with supabase tables?
    # but like this is The Code
    supabase.table("clickup_tokens").upsert({
        "user_id" : str(user_id),
        "access_token" : encrypted_token,
        "state" : state,
        "team_id" : None,
    },
    on_conflict = "user_id",
    ).execute()

    # clean up state tokens
    supabase.table("oauth_states").delete().eq("state", state).execute()
    # JSONResponse({"message": "Clickup connected successfully."})
    dashboard_url = "http://localhost:3000/dashboard"
    return RedirectResponse(url = dashboard_url)

@router.get("/tasks")
async def get_clickup_tasks(user: User = Depends(current_active_user)):
    # fetch clickup tasks: go to supabase table "clickup_tokens", select a certain row
    # '.eq' means "equals"
    # so "where user_id equals our given user_id"
    # .single() means excepting only a single row
    response = supabase.table("clickup_tokens").select("id, user_id, access_token, team_id").eq("user_id", str(user.id)).single().execute()
    if not response.data:
        raise HTTPException(status_code = 401, detail = "ClickUp not connected")
    
    token_enc = response.data["access_token"]
    team_id = response.data.get("team_id")
    token = decrypt_token(token_enc)
    headers = {"Authorization": f"Bearer {token}"}

    if not team_id:
        try:
            teams_res = requests.get("https://api.clickup.com/api/v2/team", headers = headers, timeout = 10)
            teams_res.raise_for_status()

        except requests.RequestException as e:
            logger.error(f"ClickUp team request failed: {e}")
            raise HTTPException(status_code = 502, detail = "ClickUp API request failed")
        
        teams_payload = teams_res.json()
        teams = teams_payload.get("teams", [])
        
        if not teams:
            logger.error("No teams found for user")
            raise HTTPException(status_code = 404, detail = "No teams found")

        team_id = teams[0]['id']
        
        try:
            update_res = supabase.table("clickup_tokens").update({"team_id": team_id}).eq("id", response.data["id"]).execute()

        except Exception as e:
            logger.error(f"Failed to update team_id in database: {e}")

        try:
            clickup_response = requests.get(f"https://api.clickup.com/api/v2/team/{team_id}/task", headers = headers, timeout = 10)
            clickup_response.raise_for_status()
        except requests.RequestException as e:
            logger.error(f"ClickUp API request failed: {e}")
            raise HTTPException(status_code = 502, detail = "ClickUp API request failed")

    return clickup_response.json()

# @router.post("create-task")
# async def create_clickup_task(
    # data: TaskSchema,
    # user: User = Depends(require_project_leader)
# ):
    # ...


# connect DB and clickup
# get data from clickup THROUGH REST API
# rest apis allow us to comm. to backend

# redirect users to 
# page.tsx 
# collecting showPassword and setEmail, etc etc as email and password
# /signup and /signin api
# models.py, schemas.py
# user(base) with user and password
# all we need are the tasks

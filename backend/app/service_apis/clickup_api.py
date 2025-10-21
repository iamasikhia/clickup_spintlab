from fastapi import APIRouter, Request, Depends, HTTPException
from fastapi.responses import RedirectResponse, JSONResponse
import os, secrets, requests, logging
from dotenv import load_dotenv
from supabase import create_client, Client
from app.db.supabase_connect import supabase
from app.auth.main_new import current_active_user
from cryptography.fernet import Fernet
import os, requests

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

fernet = Fernet(FERNET_KEY)

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

user_tokens = {}
# client_id = os.getenv("")
# redirect_uri = ""
# state = ""
# secret = "" # or client_secret, DO NOT ADD!
# code = ""


@router.get("/test")
def clickup_test():
    if not CLICKUP_API_TOKEN:
        raise HTTPException(status_code = 500, detail = "Missing ClickUp token")
    
    headers = {"Authorization": CLICKUP_API_TOKEN}

    try:
        response = requests.get("https://api.clickup.com/api/v2/team", headers = headers, timeout = 10)
        response.raise_for_status()
    
    except requests.RequestException as e:
        raise HTTPException(status_code = 502, detail = f"ClickUp API request failed: {e}")

    return {"status": "success",
            "data": response.json()}
            
@router.get("/auth")
def authorize_clickup():
    # endpoint triggered when user clicks Connect to ClickUp
    state = generate_state()
    auth_url = (f"https://app.clickup.com/api?client_id={CLICKUP_CLIENT_ID}&redirect_uri={CLICKUP_REDIRECT_URI}&state={state}")
    # supabase.table("oauth_states").insert({"state": state}).execute()
    return RedirectResponse(url = auth_url)

# oauth callback - exchange code for token
@router.get("oauth/callback")
async def clickup_oauth_callback(code: str, user: User = Depends(current_active_user), state: str):
    # verify state parameter
    res = supabase.table("oauth_states").select("*").eq("state", state).execute()
    if not res.data:
        raise HTTPException(status_code = 400, detail = "Invalid or expired OAuth state")

    token_url = "https://api.clickup.com/api/v2/oauth/token"
    
    payload = {
        "client_id": CLICKUP_CLIENT_ID,
        "client_secret": CLICKUP_CLIENT_SECRET,
        "code": code
    }

    try:
        response = requests.post(token_url, data = payload, timeout = 10)
        response.raise_for_status()
    except requests.RequestException as e:
        logger.error(f"Token exchange failed: {e}")
        raise HTTPException(status_code = 502, detail = "Failed to connect to ClickUp")

    access_token = res.json["access_token"]

    if not access_token:
        logger.error(f"Invalid token response: {data}")
        raise HTTPException(status_code = 400, detail = "Missing access token from ClickUp")

    # user_id = ""
    encrypted_token = fernet.encrypt(access_token.encode()).decode()
    # must make sure this complies with supabase tables?
    # but like this is The Code
    # await supabase.table("clickup_tokens").upsert({
    #     "user_id" : user_id,
    #     "access_token" : access_token,
    #     "state" : state,
    # }).execute()

    # clean up state tokens
    # supabase.table("oauth_states").delete().eq("state", state).execute()
    return JSONResponse({"message": "Clickup connected successfully."})

# authorized api call/example clickup api request
@router.get("/teams")
def get_clickup_teams(user_id: str):

    res = await supabase.table("clickup_tokens").select("access_token").eq("user_id", user.id).single().execute()
    if not res.data:
        raise HTTPException(status_code = 401, detail = "ClickUp not connected")

    token_enc = res.data[0]["access_token"]
    token = decrypt_token(token_enc)
    headers = {"Authorization": token}

    try:
        clickup_res = requests.get("https://api.clickup.com/api/v2/team", headers=headers, timeout=10)
        clickup_res.raise_for_status()
    except requests.RequestException as e:
        logger.error(f"ClickUp API request failed: {e}")
        raise HTTPException(status_code = 502, detail = "ClickUp API request failed")

    return clickup_res.json()


@router.post("create-task")
async def create_clickup_task(
    data: TaskSchema,
    user: User = Depends(require_project_leader)
):
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

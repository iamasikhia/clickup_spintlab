from fastapi import APIRouter, Request, Depends, HTTPException
from fastapi.responses import RedirectResponse, JSONResponse
import os, secrets, requests, logging
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

# router object
router = APIRouter(prefix = "/clickup", tags = ["ClickUp"])

# secure logger
logger = logging.getLogger("clickup")
logger.setLevel(logging.INFO)

CLICKUP_CLIENT_ID = os.getenv("CLICKUP_CLIENT_ID")
CLICKUP_CLIENT_SECRET = os.getenv("CLICKUP_CLIENT_SECRET")
CLICKUP_REDIRECT_URI = os.getenv("CLICKUP_REDIRECT_URI")

# generate a random state to ensure secure tokens

def generate_state():
    return secret.token_urlsafe(32)

user_tokens = {}
# client_id = os.getenv("")
# redirect_uri = ""
# state = ""
# secret = "" # or client_secret, DO NOT ADD!
# code = ""

@router.get("/auth")
def authorize_clickup():
    # endpoint triggered when user clicks Connect to ClickUp
    state = generate_state()
    auth_url = (f"https://app.clickup.com/api?client_id={CLICKUP_CLIENT_ID}&redirect_uri={CLICKUP_REDIRECT_URI}&state={state}")
    supabase.table("oauth_states").insert({"state": state}).execute()
    return RedirectResponse(url = auth_url)

# oauth callback - exchange code for token
@router.get("/callback")
def clickup_callback(code: str, state: str):
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

    data = response.json()
    access_token = data.get("access_token")

    if not access_token:
        logger.error(f"Invalid token response: {data}")
        raise HTTPException(status_code = 400, detail = "Missing access token from ClickUp")

    # user_id = ""
    # must make sure this complies with supabase tables
    # supabase.table("clickup_tokens").upsert({
    #     "user_id" : user_id,
    #     "access_token" : access_token,
    #     "state" : state
    # })

    # clean up state tokens
    # supabase.table("oauth_states").delete().eq("state", state).execute()
    return JSONResponse({"message": "Clickup connected successfully."})

# authorized api call/example clickup api request
# @router.get("/teams")
# def get_clickup_teams(user_id: str):


# connect DB and clickup
# get data from clickup THROUGH REST API
# align josh to get all data from frontend
# rest apis allow us to comm. to backend

# page.tsx 
# collecting showPassword and setEmail, etc etc as email and password
# /signup and /signin api
# models.py, schemas.py
# user(base) with user and password
# all we need are the tasks

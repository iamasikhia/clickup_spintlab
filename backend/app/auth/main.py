from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pwdlib import PasswordHash
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone
import backend.main as main
from jwt.exceptions import InvalidTokenError

# def - regular, "synchronous" function that executes sequentially
# async def - "asynchronous coroutine" function, designed for concurrency


# RANDOM secret_key, algorithm, and expiration time for JWT tokens; store in env variables soon
# run openssl rand -hex 32 in terminal to generate a random secret key
# SECRET_KEY = ""
SECRET_KEY = ""
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


fake_users = {
    "paul_ise": {
        "username": "paul_ise",
        "full_name": "Paul Ise",
        "email": "paul_ise@example.com",
        "password": "test",
        "hashed_password": "test",
        "disabled": False,
    }
}

class User(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None

class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    username: str | None = None

class UserInDB(User):
    hashed_password : str

# this receives the username and pw from our API call, responds w/ a token that accesses other endpoints and expires
oauth2_scheme = OAuth2PasswordBearer(tokenUrl = "token")

password_hash = PasswordHash.recommended()

##

app = FastAPI()

# function that verifies plain password w/ paramter of actual pw and then hashed_pw
def verify_password(plain_password, hashed_password):
    return password_hash.verify(plain_password, hashed_password)

def get_password_hash(password):
    return password_hash.hash(password)

# function that, if a user is in our database, returns a user object
def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)
        # return a UserInDB object created from the user_dict

def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    # if both checks pass, return the user object
    return user

# finally creating a JWT access token!
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        # set expiration time w/ expires_delta
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        # default expiration time of 15 minutes
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    
    to_encode.update({"exp": expire})
    encoded_jwt = main.encode(to_encode, SECRET_KEY, algorithm = ALGORITHM)
    return encoded_jwt # here's our encoded jwt token!


# dependency = function that is injected into other functions (typically path operations)
async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail = "Could not validate credentials",
        headers = {"WWW-Authenticate": "Bearer"},
    )
    # trying to decode if the token actually IS valid
    try:
        # now we're decoding jwt tokens, not fake tokens
        payload = main.decode(token, SECRET_KEY, algorithms = [ALGORITHM])
        username = payload.get("sub")
        
        if username is None:
            raise credentials_exception # above block
        token_data = TokenData(username = username)

    except InvalidTokenError:
        raise credentials_exception
    
    # continue if token is valid after try/except block
    user = get_user(fake_users, username = token_data.username)
    if user is None:
        raise credentials_exception # lots of checkpoints
    return user

# dynamic case for current active user
async def get_current_active_user(current_user: Annotated[User, Depends(get_current_user)],):
    # same case as above, but check if the current user is disabled
    if current_user.disabled:
        raise HTTPException(status_code = 400, detail = "Inactive user")
    return current_user

##

## main login endpoint
# operation for a user to send username/pw
@app.post("/token")
# define the login function with an instance of a OAuth2 pw request form
# class dependency that declares a form body with a username and password
# # ^ defines function param form_data and tells FastAPI how to process it
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], 
) -> Token:
    user = authenticate_user(fake_users, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "Incorrect username or password",
            headers = {"WWW-Authenticate": "Bearer"},
        )
    
    # timedelta is an object that represents a duration
    access_token_expires = timedelta(minutes = ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        # so here the data of the access token is a dictionary and timedelta obj. from our above function abstraction
        # user.username is the subject of the token alongside authenticate_user()
        data = {"sub": user.username}, expires_delta = access_token_expires
    )

    return Token(access_token = access_token, token_type = "bearer")

@app.post("/signup")

# can now get the current user directly in path operation function
@app.get("/users/me", response_model = User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)]):   
    return current_user

@app.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)]):
    return [{
        "item_id" : "Foo",
        "owner" : current_user.username
    }]

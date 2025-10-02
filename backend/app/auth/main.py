from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pwdlib import PasswordHash
from pydantic import BaseModel

# fake database of users - username must be the same as the key
fake_users = {
    "bruh" : {
        "username" : "bruh",
        "email" : "bruh@example.com",
        "full_name" : "Bruh Doe",
        "hashed_password" : "fakehashedsecret",
        "disabled" : False,
    },

    "paul_ise" : {
        "username" : "paul_ise",
        "email" : "paul_ise@example.com",
        "full_name" : "Paul Ise",
        "hashed_password" : "fakehashedclickclick",
        "disabled" : False,
    }
}

# run openssl rand -hex 32 in terminal to generate a random secret key
RANDOM_SECRET_KEY = "e4808addfa4f78df6385bdd7a93073dc69d6158a5ea2f46da922dca3485094cd"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def fake_hash_password(password: str):
    return "fakehashed" + password

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

def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    # if both checks pass, return the user object
    return user

# create real access token soon

# function that, if a user is in our database, returns a user object
def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)
        # return a UserInDB object created from the user_dict

def fake_decode_token(token):
    # this doesn't provide any security at all
    user = get_user(fake_users, token)
    return user

# dependency = function that is injected into other functions (typically path operations)
async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = fake_decode_token(token)
    
    if not user:
        # generate an HTTP error if user not found
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, 
        detail = "Invalid credentials",
        headers = {"WWW-Authenticate": "Bearer"},)
    return user

# dynamic case for current active user
async def get_current_active_user(current_user: Annotated[User, Depends(get_current_user)],):
    # same case as above, but check if the current user is disabled
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# can now get the current user directly in path operation function
@app.get("/users/me", response_model = User)
async def read_users_me(current_user: Annotated[User, Depends(get_current_user)]):   
    return current_user

@app.get("/users/me")
async def read_users_me(current_user: Annotated[User, Depends(get_current_active_user)]):
    return current_user

## main login endpoint
# operation for a user to send username/pw
@app.post("/token")
# define the login function with an instance of a OAuth2 pw request form
# class dependency that declares a form body with a username and password
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    ##
    # check if user exists
    user_dict = fake_users.get(form_data.username)
    
    # if not, raise another HTTPException
    if not user_dict:
        raise HTTPException(status_code = 400, detail = "Incorrect username or password")
    ##

    # otherwise if user exists, create UserInDB object and return a fake hashed password
    user = UserInDB(**user_dict)
    hashed_password = fake_hash_password(form_data.password)
    # again, raise HTTPException if pw is incorrect
    if not hashed_password == user.hashed_password:
        raise HTTPException(status_code = 400, detail = "Incorrect username or password")

    # return a user's token! (for now, just the username)
    return {"access_token": user.username, "token_type": "bearer"}



from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI
from .db.models import User
from fastapi_users import FastAPIUsers
from .schemas import UserCreate, UserRead, UserUpdate
from .auth.main_new import auth_backend, current_active_user, fastapi_users
from fastapi.middleware.cors import CORSMiddleware
from .service_apis.clickup_api import router as clickup_router
from .service_apis.openai_api import return_output
# import fastapi, post-making library, and middleware

app = FastAPI()
@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

# middleware
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:8000",
    "clickup-spintlab-kiy3.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

# get routes
posts = [
    {
        "id": 1,
        "title": "Sample Post Title",
        "content": "This is a sample post content."
    },
]

# tldr allow_origins of the origins list we just initialized that allows the localhost to connect
# necessary for frontend host to connect to different backend localhost website 

app.include_router(clickup_router)

# ALL OF THE FOLLOWING ADDS AUTHENTICATION POSTS FROM fastapi_users LIBRARY
# custom routers are in clicku_api.py - prefix = "/clickup"

# POST /auth/jwt/login
# POST /auth/jwt/logout
# etc
app.include_router(
    fastapi_users.get_auth_router(auth_backend), 
    prefix = "/auth/jwt", 
    tags = ["auth"],
)

# POST /auth/register
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix = "/auth",
    tags = ["auth"],
)

# POST /auth/forgot-password
# POST /auth/reset-password
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix = "/auth",
    tags = ["auth"],
)

# POST /auth/verify
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix = "/auth",
    tags = ["auth"],
)

app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix = "/users",
    tags = ["users"],
)

# custom routes
# need @app endpoint for /users/me

@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}, welcome to authorization."}

@app.get("/smart-billing")
async def openai_route(title: str, time: float, rate: float, logs: int, user: User = Depends(current_active_user),):
    description = return_output(title=title, time=time, rate=rate, logs=logs)
    return {"description": description}


# # GET routes
# @app.get("/posts", tags=["posts"])
# async def get_posts() -> dict:
#     return {"data": posts}

# async def add_post(post: PostSchema) -> dict:
#     post.id = len(posts) + 1
#     posts.append(post.dict())
#     return {
#         "data": "Post added."
#     }

# @app.post("/posts/{id}", tags=["posts"])
# async def get_single_post(id: int) -> dict:
#     if id > len(posts):
#         return {
#             "error": "Post not found."
#         }
    
#     for post in posts:
#         if[post["id"] == id]:
#             return {
#                 "data": post
#             }
        

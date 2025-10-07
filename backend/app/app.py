from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI
from app.db import User, create_db_and_tables
from app.schemas import UserCreate, UserRead, UserUpdate
from app.users import auth_backend, current_active_user, fastapi_users

from fastapi.middleware.cors import CORSMiddleware
# import fastapi, post-making library, and middleware

#add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_and_tables()
    yield

#initialize app instance
app = FastAPI(lifespan = lifespan)

# get routes
posts = [
    {
        "id": 1,
        "title": "Sample Post Title",
        "content": "This is a sample post content."
    },
]


# middleware
origins = [
    "http://localhost",
    "http://localhost:3000",
]

# tldr allow_origins of the origins list we just initialized that allows the localhost to connect
# necessary for frontend host to connect to different backend localhost website 

users = []

app.include_router(
    fastapi_users.get_auth_router(auth_backend), 
    prefix = "/auth/jwt", 
    tags = ["auth"],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix = "/auth",
    tags = ["auth"],
)

app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix = "/auth",
    tags = ["auth"],
)

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

@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}, welcome to authorization."}

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
        

from fastapi import FastAPI
from app.model import PostSchema
from fastapi.middleware.cors import CORSMiddleware
# import fastapi, post-making library, and middleware

#initialize app instance
app = FastAPI()

# get routes
posts = [
    {
        "id": 1,
        "title": "Sample Post Title",
        "content": "This is a sample post content."
    },

    {
        "id": 2,
        "title": "Sample Post Title",
        "content": "new new."
    }
]

testing = [
    {
        "id": 1,
        "title": "Sample Post Title",
        "content": "hi"
    }
]

# middleware
origins = [
    "http://localhost",
]

#add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

# tldr allow_origins of the origins list we just initialized that allows the localhost to connect
# necessary for frontend host to connect to different backend localhost website 


users = []

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to authorization."}

# GET routes
@app.get("/posts", tags=["posts"])
async def get_posts() -> dict:
    return {"data": posts}

async def add_post(post: PostSchema) -> dict:
    post.id = len(posts) + 1
    posts.append(post.dict())
    return {
        "data": "Post added."
    }

@app.post("/posts/{id}", tags=["posts"])
async def get_single_post(id: int) -> dict:
    if id > len(posts):
        return {
            "error": "Post not found."
        }
    
    for post in posts:
        if[post["id"] == id]:
            return {
                "data": post
            }
        

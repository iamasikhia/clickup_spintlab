from fastapi import FastAPI
from app.model import PostSchema

app = FastAPI()

# get route

posts = [
    {
        "id": 1,
        "title": "Sample Post Title",
        "content": "This is a sample post content."
    }
]

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
        

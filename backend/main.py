import uvicorn
from fastapi import FastAPI
from app import app as fastapi_app
import asyncio
from app.db import models
from app.db.supabase_connect import engine, Base, get_async_session

# optional
# async def create_db():
    #async with engine.begin() as conn:
        #await conn.run_sync(Base.metadata.create_all)

# disable later for production
async def test_connection():
     try:
          async with engine.begin() as conn:
               result = await conn.execute("SELECT NOW()")
               print(await result.fetchone())
     except Exception as e:
          print("Connection failed", e)

async def on_startup():
    await test_connection()

# specify http://localhost:8000
# add --port 8000 --reload

if __name__ == "__main__":
    # asyncio.run(create_db())
    # asyncio.run(test_connection())
    uvicorn.run(
        "app.app:app", 
        host="127.0.0.1", 
        port=8000, 
        log_level = "info", 
        reload = True)

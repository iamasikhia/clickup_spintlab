import uvicorn
import asyncio
from app import app
from app.db import models
from app.db.supabase_connect import engine, Base, get_async_session

async def create_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# disable later for production
async def test_connection():
     try:
          async with engine.begin() as conn:
               result = await conn.execute("SELECT NOW()")
               print(await result.fetchone())
     except Exception as e:
          print("Connection failed", e)

async def main():
    await test_connection()

# specify http://localhost:8000
# add --port 8000 --reload

if __name__ == "main":
    asyncio.run(main())
    # asyncio.run(create_db())
    # asyncio.run(test_connection())
    uvicorn.run("app.app:app", host="localhost", port=8000, log_level = "info", reload=True)

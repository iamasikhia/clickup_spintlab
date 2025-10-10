import uvicorn
import asyncio
from app.app import app
from db.supabase_connect import engine, Base

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

if __name__ == "__main__":
    import asyncio
    asyncio.run(create_db())
    asyncio.run(test_connection())
    uvicorn.run("app.app:app", host="localhost", port=8000, log_level = "info", reload=True)

# specify http://localhost:8000
# add --port 8000 --reload
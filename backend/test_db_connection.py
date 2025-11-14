import asyncio
from app.db.supabase_connect import async_session_maker
from sqlalchemy import text

async def check():
    async with async_session_maker() as session:
        result = await session.execute(text("SELECT 1"))
        print(result.scalar())

asyncio.run(check())
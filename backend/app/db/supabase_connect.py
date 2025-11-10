import psycopg2
from dotenv import load_dotenv
import os
import asyncio

from supabase import create_client, Client
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.pool import NullPool
from sqlalchemy.orm import sessionmaker, declarative_base
from fastapi import Depends
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase
from .base_model import Base

# Load environment variables from .env
load_dotenv()

# Fetch variables
USER = os.getenv("user")
PASSWORD = os.getenv("password")
HOST = os.getenv("host")
PORT = os.getenv("port")
DBNAME = os.getenv("dbname")

URL = f"postgresql+asyncpg://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}"
KEY = os.getenv("SUPABASE_KEY")

if not URL:
    raise ValueError("Missing environent variable: URL")

if not KEY:
    raise ValueError("Missing environent variable: KEY")

engine = create_async_engine(URL, poolclass = NullPool, echo = True)
async_session_maker = sessionmaker(engine, class_ = AsyncSession, expire_on_commit = False)

Base = declarative_base()

async def get_async_session() -> AsyncSession:
     async with async_session_maker() as session:
          yield session

async def get_user_db(session: AsyncSession = Depends(get_async_session)):
     from .models import User
     yield SQLAlchemyUserDatabase(session, User)

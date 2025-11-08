import psycopg2
from dotenv import load_dotenv
import os
import asyncio
import asyncpg

import supabase
from sqlalchemy.engine import URL
from supabase import create_client, Client
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.pool import NullPool
from sqlalchemy.orm import sessionmaker, declarative_base
from fastapi import Depends
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase
from .models import User

# Load environment variables from .env
load_dotenv()

Base = declarative_base()

# Fetch variables
USER = os.getenv("DB_USER")
PASSWORD = os.getenv("DB_PASSWORD")
HOST = os.getenv("DB_HOST")
PORT = os.getenv("DB_PORT")
DBNAME = os.getenv("DB_NAME")
KEY = os.getenv("KEY")

# DB_URL = f"postgresql+asyncpg://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}"

DB_URL = URL.create(
     drivername = "postgresql+asyncpg",
     username = USER,
     password = PASSWORD,
     host = HOST,
     port = PORT,
     database = DBNAME
)

engine = create_async_engine(
     DB_URL,
     echo = True,
     future = True
)

async_session_maker = async_sessionmaker(
     bind = engine, 
     class_ = AsyncSession,
     expire_on_commit = False,
     )

Base = declarative_base() # ORM models

async def get_async_session():
     async with async_session_maker() as session:
          yield session

async def get_user_db(session: AsyncSession = Depends(get_async_session)):
     yield SQLAlchemyUserDatabase(session, User)

# def get_db():
#      db = SyncSessionLocal()
#      try:
#           yield db
#      finally:
#           db.close()

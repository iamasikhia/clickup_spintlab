import psycopg2
from dotenv import load_dotenv
import os
import asyncio
import asyncpg

import supabase
from supabase import create_client, Client
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.pool import NullPool
from sqlalchemy.orm import sessionmaker, declarative_base
from fastapi import Depends
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase
from .base_model import Base
from sqlalchemy.pool import NullPool
asyncpg.connection._STATEMENT_CACHE_SIZE = 0

# Load environment variables from .env
load_dotenv()

# Fetch variables
USER = os.getenv("DB_USER")
PASSWORD = os.getenv("DB_PASSWORD")
HOST = os.getenv("DB_HOST")
PORT = os.getenv("DB_PORT")
DBNAME = os.getenv("DB_NAME")

URL = f"postgresql+asyncpg://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}"
KEY = os.getenv("KEY")

if not URL:
    raise ValueError("Missing environment variable: URL")

if not KEY:
    raise ValueError("Missing environment variable: KEY")

engine = create_engine(
     URL, 
     echo = True,
     pool_pre_ping = True
)

SyncSessionLocal = sessionmaker(
     bind = engine, 
     autocommit = False,
     autoflush = False)

Base = declarative_base() # ORM models

def get_db():
     db = SyncSessionLocal()
     try:
          yield db
     finally:
          db.close()
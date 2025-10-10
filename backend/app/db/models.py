# SQLAlchemy models
import uuid
from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy import Column, String
from db.supabase_connect import Base

class User(SQLAlchemyBaseUserTableUUID, Base):
    role = Column(String, nullable = False, default = "user")
# SQLAlchemy models
from uuid import UUID, uuid4
import uuid

from sqlalchemy import Boolean, Column, String, Integer
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
from .base_model import Base
from .supabase_connect import engine

class User(SQLAlchemyBaseUserTable[UUID], Base):
    __tablename__ = "users"
    id = Column(PG_UUID(as_uuid = True), primary_key = True, default = uuid4)
    #email = 
    #name = 
    #auth_method = 
    role = Column(String, nullable = False, default = "user")
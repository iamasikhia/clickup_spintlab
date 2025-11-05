# SQLAlchemy models
from uuid import UUID, uuid4
import uuid

from sqlalchemy import Boolean, Column, String, Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
from .base_model import Base
from .supabase_connect import engine
from datetime import datetime

# define sqlalchemy model for average user, ensuring it matches supabase schema
# fastapi only needs User for authentication, so not much else is needed(?)

class User(SQLAlchemyBaseUserTable[UUID], Base):
    __tablename__ = "users"

    name = Column(String, nullable = True)
    id = Column(PG_UUID(as_uuid = True), primary_key = True, default = uuid.uuid4)
    role = Column(String, nullable = False, default = "user")
    # email = Column(String, nullable = False, unique = True)
    # name = Column(String, nullable = True)
    auth_method = Column(String, nullable = True, default = "email") 
    # created_at = Column(DateTime(timezone = True), server_default = func.now())
    
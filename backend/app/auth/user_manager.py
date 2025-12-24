from fastapi_users import BaseUserManager, UUIDIDMixin
from app.db.models import User
import os
import uuid
from typing import Union
from app.schemas import UserCreate
from dotenv import load_dotenv

load_dotenv()
KEY = os.getenv("SUPABASE_KEY")

class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = KEY
    verification_token_secret = KEY

    async def on_after_register(self, user: User, request = None):
        print(f"User {user.id} has registered.")

    async def validate_password(self, password: str, user: Union[UserCreate, User]) -> None:
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters long.")
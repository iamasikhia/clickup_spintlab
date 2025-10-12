import uuid
from typing import Optional, Union

from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin, models, InvalidPasswordException
from fastapi_users.authentication import (AuthenticationBackend, BearerTransport, JWTStrategy,)
from .schemas import UserCreate
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable

from .db.models import User
from .db.supabase_connect import get_user_db

# use strong passphrase; keep secure
SECRET = "SECRET"

# for BaseUserManager, two generic types are defined
# user - user model defined in db.py for each user
# UUID - correspond to the type of ID used on the model (UUID)

class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    # validate password for user registration
    async def validate_password(self, password: str, user: Union[UserCreate, User]) -> None:
        if len(password) < 8:
            raise InvalidPasswordException(
                reason = "Password should be at least 8 characters."
            )
        

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        print(f"User {user.id} has registered.")

    async def on_after_forgot_password(self, user: User, token: str, request: Optional[Request] = None):
        print(f"User {user.id} has forgotten their password. Reset token: {token}")

    async def on_after_request_verify(self, user: User, token: str, request: Optional[Request] = None):
        print(f"Verification requested for user {user.id}. Verification token: {token}")


async def get_user_manager(user_db = Depends(get_user_db)):
    yield UserManager(user_db)
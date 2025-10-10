from fastapi_users import BaseUserManager, UUIDIDMixin
from db.models import User
import os

# SECRET = os.getenv("SECRET")

# class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
#     reset_password_token_secret = SECRET
#     verificiation_token_secret = SECRET

#     async def on_after_register(self, user: User, request = None):
#         print(f"User {user.id} has registered.")
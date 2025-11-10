from fastapi_users.authentication import AuthenticationBackend, BearerTransport, JWTStrategy
from fastapi_users import FastAPIUsers
import fastapi_users
from app.db.models import User
from fastapi import Depends
from app.db.supabase_connect import get_user_db
from .user_manager import UserManager
import uuid
from uuid import UUID

SECRET = "SECRET"
PUBLIC_KEY = "PUBLIC"

# fix link
bearer_transport = BearerTransport(tokenUrl = "auth/jwt/login")

async def get_user_manager(user_db = Depends(get_user_db)):
    yield UserManager(user_db)

def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(
        secret = SECRET, 
        lifetime_seconds = 3600,
        algorithm = "RS256",
        public_key = PUBLIC_KEY,
        )

auth_backend = AuthenticationBackend(
    name = "jwt",
    transport = bearer_transport,
    get_strategy = get_jwt_strategy,
)

fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend]
)

current_active_user = fastapi_users.current_user(active = True)

# pass these backends to FastAPIUsers instance 
# and gen. auth router for each one

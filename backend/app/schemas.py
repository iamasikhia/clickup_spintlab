import uuid
from fastapi_users import schemas

# Pydantic schemas - schemas that handle how user data
# is validated and serialized
# handles API data shape. may need to add custom fields later

class UserRead(schemas.BaseUser[uuid.UUID]):
    name: str | None = None
    auth_method: str | None = "email"
    role: str | None = "user"


class UserCreate(schemas.BaseUserCreate):
    name: str | None = None
    role: str | None = "user"
    auth_method: str | None = "email"


class UserUpdate(schemas.BaseUserUpdate):
    name: str | None = None
    role: str | None = "user"
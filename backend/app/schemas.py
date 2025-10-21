import uuid
from fastapi_users import schemas

# Pydantic schemas - schemas that handle how user data
# is validated and serialized
# handles API data shape. may need to add custom fields later

class UserRead(schemas.BaseUser[uuid.UUID]):
    pass


class UserCreate(schemas.BaseUserCreate):
    role: str = "user"


class UserUpdate(schemas.BaseUserUpdate):
    pass
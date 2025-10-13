from fastapi import Depends, HTTPException
from auth.main import current_active_user
from db.models import User

def require_role(role: str):
    def checker(user: User = Depends(current_active_user)):
        if user.role != role:
            raise HTTPException(status_code = 403, detail = "Not enough privileges")
        return user
    return checker

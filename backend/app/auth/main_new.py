from fastapi_users.authentication import AuthenticationBackend, BearerTransport, JWTStrategy

SECRET = "SECRET"
PUBLIC_KEY = "PUBLIC"

# fix link
bearer_transport = BearerTransport(tokenUrl = "auth/jwt/login")

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

# pass these backends to FastAPIUsers instance 
# and gen. auth router for each one
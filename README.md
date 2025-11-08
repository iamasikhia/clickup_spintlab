## ClickUp Sprint Lab

Create a `.env` file in the root directory to store environment variables:
```
KEY = your-key

DB_USER = test_user1
DB_PASSWORD = xxxx
DB_HOST = xxxx
DB_PORT = xxxx
DB_NAME = xxxx

FERNET_KEY = xxxx
CLICKUP_API_TOKEN = xxx__clickup_api_token
CLICKUP_CLIENT_ID = xxx__clickup_client_id
CLICKUP_CLIENT_SECRET = xxx_clickup_client_secret
SECRET = your-secret
OPENAI_KEY = your-openai-key
CLICKUP_REDIRECT_URI = https://yourdomain.com/api/clickup/callback

NEXT_PUBLIC_SUPABASE_URL = https://xxx.xxx.xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-supabase-anon-key
SUPABASE_RLS_POLICY_KEY = your-supabase-rls-key
```

To run the backend, cd into the backend folder and enter the following into the terminal: `uvicorn app.app:app --reload`

From there, click on the host link and append /docs to reach the swagger screen.

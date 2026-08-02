# File for the FastAPI backend, which is ported over from old Typescript routes
# the route uses /api/py prefix for backwards compatibility with TS routes
# that use /api prefix.

from fastapi import Depends, FastAPI, HTTPException
from fastapi import Query
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from os import environ
from postgrest import APIError
from pydantic import BaseModel
from supabase import create_client, Client
from dataclasses import dataclass
from supabase_auth import User

# initialize supabase environment variables
SUPABASE_ANON_KEY = environ["NEXT_PUBLIC_SUPABASE_ANON_KEY"]
SUPABASE_URL = environ["NEXT_PUBLIC_SUPABASE_URL"]
# create the global supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

@dataclass
class AuthedUser:
    user: User
    client: Client

bearer_scheme = HTTPBearer()

async def get_authed_user(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)) -> AuthedUser:
    # Retrieve the JWT
    token = credentials.credentials
    
    # ask supabase who this token belongs to - returns None if invalid
    # later use the .user attribute to return the AuthedUser
    user_response = supabase.auth.get_user(token)
    if user_response is None or user_response.user is None:
        raise HTTPException(status_code=401, detail="unauthorized")
    
    # fresh client per request instead of the global `supabase` - so its
    # postgrest auth header scoped to this one request only
    request_client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
    request_client.postgrest.auth(token)
    
    # Create authed user to return
    # Useful b/c we need both the user and the client to enforce RLS
    # Avoids double calls to supabase Auth
    authed_user = AuthedUser(user = user_response.user, client=request_client)
    return authed_user
    
    
# initialize fastapi app instance
app = FastAPI()

@app.get("/api/py/index")
async def read_root():
    return {"message": "hello world"}

# Leaderboard route
@app.get("/api/py/leaderboard")
async def get_leaderboard(
    language: str | None = None,
    mode: str | None = None, 
    limit: int = Query(default=50, ge=0, le=100), # default 50 and 0 <= l <= 100
):    
    # Retrieve the limit query parameters, with a default display of 50 and max of 100
    request_payload = supabase.rpc("get_leaderboard", {
        "lang": language,
        "mode_filter": mode,
        "lim": limit
    })
    try:
        # execute sql to supabase
        response = request_payload.execute()
        return response.data
    except APIError as e:
        print(f"leaderboard error: {e}")
        raise HTTPException(
            status_code=500,
            detail=e.message
        )

class ResultsModel(BaseModel):
    wpm: float
    accuracy: float
    language: str
    mode: str
    duration: float
    
# Post results of a typing test to the database
@app.post("/api/py/results", status_code=201)
async def post_results(payload: ResultsModel, authed: AuthedUser = Depends(get_authed_user)):
    try:
        request_payload = authed.client.table("results").insert({
            "user_id": authed.user.id,
            "wpm": payload.wpm,
            "accuracy": payload.accuracy,
            "language": payload.language,
            "mode": payload.mode,
            "duration": payload.duration
        })
        
        request_payload.execute()
    except APIError as e:
        raise HTTPException(status_code=500, detail=e.message)
    
    return 
    
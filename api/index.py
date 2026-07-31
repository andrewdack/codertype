from fastapi import FastAPI, HTTPException
from fastapi import Query

from os import environ
from postgrest import APIError
from supabase import create_client, Client

# File for the FastAPI backend, which is ported over from old Typescript routes
# the route uses /api/py prefix for backwards compatibility with TS routes
# that use /api prefix.


# initialize supabase environment variables
supabase_anon_key = environ["NEXT_PUBLIC_SUPABASE_ANON_KEY"]
supabase_url = environ["NEXT_PUBLIC_SUPABASE_URL"]

# create the supabase client
supabase: Client = create_client(
    supabase_url=supabase_url,
    supabase_key=supabase_anon_key
)

# initialize fastapi app instance
app = FastAPI()

@app.get("/api/py/index")
def read_root():
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
        
# post results of test route
@app.post("/api/py/results")
async def post_results():
    return {"results": "testing"}
    
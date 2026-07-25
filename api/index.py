from fastapi import FastAPI, Request
from os import environ
from supabase import create_client, Client

# initialize supabase environment variables
supabase_anon_key = environ["NEXT_PUBLIC_SUPABASE_ANON_KEY"]
supabase_url = environ["NEXT_PUBLIC_SUPABASE_URL"]

# create the supabase client
supabase: Client = create_client(
    supabase_url=supabase_url,
    supabase_key=supabase_anon_key
)

# intiialize fastapi app instance
app = FastAPI()

@app.get("/api/py/index")
def read_root():
    return {"message": "hello world"}

# Leaderboard route
# /py for compatability with the typescript route
@app.get("/api/py/leaderboard")
async def get_leaderboard(request: Request):
    language: str | None = request.query_params.get("language")
    mode: str | None = request.query_params.get("mode")
    
    # Retrieve the limit query parameters, with a default display of 50 and max of 100
    DEFAULT_LIMIT = 50
    limit_str: str | None = request.query_params.get("limit")
    limit = None
    if limit_str is None:
        limit = DEFAULT_LIMIT
    else:
        limit = min(int(limit_str), 100)    
    
    response = supabase.rpc("get_leaderboard", {
        "lang": language,
        "mode_filter": mode,
        "lim": limit
    }).execute()
    
    print(response.data)
    return response.data

# Post results of test route
@app.post("/api/py/results")
async def post_results():
    return {"results": "testing"}

# @app.get("/{catchall:path}")
# async def catch_all(catchall: str):
#     return {
#         "message": "caught by catch call",
#         "catch_all_path": catchall
#     }
    
    
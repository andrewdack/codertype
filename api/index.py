from fastapi import FastAPI
app = FastAPI()

@app.get("/api/index")
def read_root():
    return {"message": "hello world"}

# Leaderboard route
# /py for compatability with the typescript route
@app.get("/api/py/leaderboard")
async def get_leaderboard():
    return {"leaderboard": "hi"}

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
    
    
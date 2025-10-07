import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.app:app", host="localhost", port=8000, log_level = "info", reload=True)

# specify http://localhost:8000
# add --port 8000 --reload
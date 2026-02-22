from fastapi import FastAPI
from backend.routes.chat import router as chat_router
from backend.database.db import engine
from backend.models.resume import Base

app = FastAPI()

app.include_router(chat_router)

@app.get("/")
def root():
    return {"message": "AI Portfolio Backend Running 🚀"}

Base.metadata.create_all(bind=engine)
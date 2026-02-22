from fastapi import APIRouter
from pydantic import BaseModel
from backend.services.openrouter_service import ask_ai
from backend.database.db import SessionLocal
from backend.models.resume import Resume

router = APIRouter(prefix="/chat")

# 🔹 Request model for chat
class ChatRequest(BaseModel):
    question: str

# 🔹 Request model for adding resume
class ResumeRequest(BaseModel):
    content: str


@router.post("/")
def chat_with_ai(request: ChatRequest):
    db = SessionLocal()
    resume = db.query(Resume).first()
    db.close()

    if not resume:
        return {"error": "Resume data not found"}

    answer = ask_ai(resume.content, request.question)
    return {"response": answer}


@router.post("/add-resume")
def add_resume(request: ResumeRequest):
    db = SessionLocal()

    new_resume = Resume(content=request.content)
    db.add(new_resume)
    db.commit()
    db.close()

    return {"message": "Resume added successfully"}
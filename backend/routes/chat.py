from fastapi import APIRouter
from pydantic import BaseModel
from backend.services.openrouter_service import ask_ai

router = APIRouter(prefix="/chat")

class ChatRequest(BaseModel):
    question: str

@router.post("/")
async def chat(request: ChatRequest):
    response = await ask_ai(request.question)
    return {"response": response}
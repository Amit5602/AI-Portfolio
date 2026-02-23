import os
import requests
from fastapi import APIRouter
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

# ----------------------------
# Resume Context
# ----------------------------
RESUME_CONTEXT = """
Amit Kumar is a Full Stack Developer.

Skills:
Frontend: React, TypeScript
Backend: Python, FastAPI, Laravel
Database: MongoDB, SQLite
Other: REST APIs, SQLAlchemy

He has built an AI-powered portfolio website using React (TypeScript) and FastAPI,
integrated with OpenRouter AI.
"""

# ----------------------------
# Request Model
# ----------------------------
class ChatRequest(BaseModel):
    question: str
    history: list | None = None  # Optional chat history


# ----------------------------
# Chat Route
# ----------------------------
@router.post("/chat/")
def chat_with_ai(data: ChatRequest):

    try:
        # Build conversation messages
        messages = [
            {
                "role": "system",
                "content": f"""
You are Amit Kumar's AI portfolio assistant.

Rules:
- Answer naturally and conversationally.
- Keep answers clear and professional.
- If similar question is asked again, answer slightly differently.
- Only answer using the resume information below.
- Do NOT invent fake experience.

Resume:
{RESUME_CONTEXT}
"""
            }
        ]

        # Add previous chat history if exists
        if data.history:
            messages.extend(data.history)

        # Add current question
        messages.append({
            "role": "user",
            "content": data.question
        })

        response = requests.post(
            OPENROUTER_URL,
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "mistralai/mistral-7b-instruct",
                "messages": messages,
                "temperature": 0.8,   # 🔥 More natural responses
                "max_tokens": 300
            }
        )

        result = response.json()

        if "error" in result:
            return {"response": f"OpenRouter Error: {result['error']}"}

        ai_reply = result["choices"][0]["message"]["content"]

        return {"response": ai_reply}

    except Exception as e:
        return {"response": f"Server Error: {str(e)}"}
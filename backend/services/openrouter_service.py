import os
import requests
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

async def ask_ai(question: str):

    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    data = {
        "model": "mistralai/mistral-7b-instruct",
        "messages": [
            {
                "role": "system",
                "content": """
You are an AI assistant answering questions about Amit Kumar's resume.

Skills:
Frontend: React, TypeScript
Backend: Python, FastAPI, Laravel
Database: MongoDB

Answer only based on this information.
If question is unrelated, say:
"This information is not available in Amit's resume."
"""
            },
            {
                "role": "user",
                "content": question
            }
        ]
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code != 200:
        return f"OpenRouter Error: {response.text}"

    return response.json()["choices"][0]["message"]["content"]
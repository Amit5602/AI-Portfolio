import os
import requests
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

API_KEY = os.getenv("OPENROUTER_API_KEY")
print("LOADED API KEY:", API_KEY)


def ask_ai(resume_data, question):

    if not API_KEY:
        return "API KEY NOT LOADED"

    prompt = f"""
You are Amit Kumar's professional AI assistant.

Rules:
- Answer only from the resume provided.
- If the answer is not present in the resume, reply:
  "This information is not available in Amit's resume."
- Keep answers short and professional.

Resume:
{resume_data}

Question:
{question}
"""

    response = requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost",
            "X-Title": "AI Portfolio"
        },
        json={
            "model": "mistralai/mistral-7b-instruct",
            "messages": [
                {"role": "user", "content": prompt}
            ]
        }
    )

    print("STATUS CODE:", response.status_code)
    print("RAW RESPONSE:", response.text)

    if response.status_code != 200:
        return f"OpenRouter Error: {response.text}"

    data = response.json()

    if "choices" not in data:
        return f"Unexpected response format: {data}"

    return data["choices"][0]["message"]["content"]
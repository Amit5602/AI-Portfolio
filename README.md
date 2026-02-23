# 🚀 AI-Powered Portfolio – Amit Kumar

A modern full-stack portfolio website with integrated AI chat functionality that allows users to interact with my resume in real time.

🌐 **Live Frontend:** https://ai-portfolio-olive-omega.vercel.app  
⚙️ **Live Backend API:** https://ai-portfolio-0xxy.onrender.com  
📦 **GitHub Repository:** https://github.com/Amit5602/AI-Portfolio  

---

## ✨ Features

- 🎨 Modern UI built with React + TypeScript
- 🤖 AI Chat powered by OpenRouter (Free AI Model)
- 🐍 Python FastAPI backend
- 🗄 SQLite database using SQLAlchemy ORM
- 🔐 Secure environment variable handling
- ☁️ Fully deployed (Vercel + Render)
- 📱 Responsive design

---

## 🏗 Tech Stack

### Frontend
- React
- TypeScript
- Axios
- Tailwind CSS

### Backend
- Python
- FastAPI
- SQLAlchemy
- SQLite

### AI Engine
- OpenRouter API (Free Model)

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 🧠 How the AI Chat Works

1. User enters a question in the chat UI.
2. Frontend sends the question to FastAPI backend.
3. Backend retrieves resume data from SQLite database.
4. Resume context + user question sent to OpenRouter.
5. AI response returned and displayed in chat.

---

## 🏛 Architecture Flow

User (Browser)  
↓  
React + TypeScript (Vercel)  
↓  
FastAPI Backend (Render)  
↓  
SQLite Database (SQLAlchemy)  
↓  
OpenRouter API  
↓  
Response → Frontend Chat UI  

---

## 🔒 Environment Variables

### Backend (Render)

OPENROUTER_API_KEY=your_api_key

### Frontend (Vercel)

VITE_API_URL=https://ai-portfolio-0xxy.onrender.com

---

## 🛠 Run Locally

### Backend

cd backend  
pip install -r requirements.txt  
uvicorn main:app --reload  

### Frontend

cd frontend  
npm install  
npm run dev  

---

## 📌 Why This Project?

This project demonstrates:

- Full-stack development capability  
- Clean backend architecture  
- AI API integration  
- Secure production deployment  
- Real-world DevOps practices  

---

## 👨‍💻 Author

Amit Kumar  
Full Stack Developer | AI Enthusiast  

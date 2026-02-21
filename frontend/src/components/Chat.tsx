import { useState, useRef, useEffect } from "react";
import axios from "axios";

function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [chatHistory, setChatHistory] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isLoading]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userText = message;
    setMessage("");

    setChatHistory((prev) => [
      ...prev,
      { role: "user", text: userText },
    ]);

    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/chat/", {
        question: userText,
      });

      setChatHistory((prev) => [
        ...prev,
        { role: "ai", text: response.data.response },
      ]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { role: "ai", text: "Error connecting to AI." },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition hover:scale-105 active:scale-95"
      >
        AI Chat
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 backdrop-blur-lg bg-white/10 border border-white/20 text-white rounded-2xl shadow-2xl flex flex-col max-h-[70vh]">
          <div className="p-4 border-b border-white/20 font-bold">
            AI Assistant
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 ${
                  chat.role === "user"
                    ? "self-end flex-row-reverse"
                    : "self-start"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
                  {chat.role === "user" ? "You" : "AI"}
                </div>

                <div
                  className={`p-2 rounded-lg text-sm max-w-[70%] ${
                    chat.role === "user"
                      ? "bg-blue-600"
                      : "bg-white/20 backdrop-blur-md"
                  }`}
                >
                  {chat.text.split("\n").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="bg-white/20 p-2 rounded-lg text-sm animate-pulse self-start">
                AI is typing...
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/20 flex items-end gap-2">
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask something..."
              rows={1}
              className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg outline-none resize-none"
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
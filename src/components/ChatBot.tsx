"use client";

import { useState } from "react";
import { askGemini } from "../lib/gemini";

type Message = {
  role: "bot" | "user";
  text: string;
};

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi 👋 I'm Benjamin's portfolio assistant. How would you like to explore?",
    },
  ]);

  const options = ["📄 View CV", "💼 Projects", "🧠 Skills", "📬 Contact"];

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const handleClick = async (option: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: option },
      { role: "bot", text: "Typing..." },
    ]);

    await sleep(800);

    const reply = await askGemini(option);

    setMessages((prev) => [
      ...prev.slice(0, -1),
      { role: "bot", text: "" },
    ]);

    let current = "";
    for (let i = 0; i < reply.length; i++) {
      current += reply[i];
      await sleep(15);

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "bot",
          text: current,
        };
        return updated;
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-xl flex flex-col overflow-hidden">
        
        <div className="h-[450px] p-4 overflow-y-auto space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`px-4 py-2 rounded-xl max-w-[75%] text-sm ${
                msg.role === "bot"
                  ? "bg-gray-200 text-black"
                  : "bg-blue-500 text-white ml-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 p-3 border-t">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleClick(opt)}
              className="bg-black text-white py-2 rounded-lg hover:bg-gray-800"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
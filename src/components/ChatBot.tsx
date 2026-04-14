"use client";

import { useEffect, useRef, useState } from "react";
import { askGemini } from "../lib/gemini";

type Message = {
  role: "bot" | "user";
  text: string;
};

const languages = [
  "English",
  "French",
  "Spanish",
  "German",
  "Chinese",
  "Arabic",
  "Portuguese",
  "Hindi",
  "Swahili",
  "Japanese",
  "Kinyarwanda 🇷🇼",
];

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi 👋 I'm Benjamin's AI portfolio assistant. How would you like to explore?",
    },
  ]);

  const [lang, setLang] = useState("English");

  const options = ["📄 View CV", "💼 Projects", "🧠 Skills", "📬 Contact"];

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const chatRef = useRef<HTMLDivElement>(null);

  // auto scroll
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleClick = async (option: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: option },
      { role: "bot", text: "..." },
    ]);

    await sleep(700);

    const reply = await askGemini(
      `Respond in ${lang}. User selected: ${option}`
    );

    setMessages((prev) => [
      ...prev.slice(0, -1),
      { role: "bot", text: "" },
    ]);

    let current = "";

    for (let i = 0; i < reply.length; i++) {
      current += reply[i];

      if (i % 2 === 0) await sleep(10);

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">

      {/* HEADER */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-white">
          Benjamin Portfolio AI
        </h1>
        <p className="text-gray-300">
          Interactive CV Assistant
        </p>
      </div>

      {/* LANGUAGE SELECTOR */}
      <div className="mb-4">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="p-2 rounded-lg bg-white text-black"
        >
          {languages.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>

      {/* CHAT CARD */}
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl flex flex-col overflow-hidden">

        {/* CHAT */}
        <div
          ref={chatRef}
          className="h-[450px] p-4 overflow-y-auto space-y-3"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`px-4 py-2 rounded-xl max-w-[75%] text-sm ${
                msg.role === "bot"
                  ? "bg-white/20 text-white"
                  : "bg-blue-500 text-white ml-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="grid grid-cols-2 gap-2 p-3 border-t border-white/20">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleClick(opt)}
              className="text-sm bg-white text-black py-2 rounded-lg hover:bg-gray-200 transition"
            >
              {opt}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
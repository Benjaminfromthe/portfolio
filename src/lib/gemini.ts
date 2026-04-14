export async function askGemini(prompt: string) {
  if (prompt.includes("CV")) {
    return "📄 Benjamin is a software developer skilled in React, Next.js, and backend systems. He builds modern web apps and AI-powered tools.";
  }

  if (prompt.includes("Projects")) {
    return "💼 Projects: Portfolio chatbot, LeetCode solutions, and full-stack web apps using React + Node.js.";
  }

  if (prompt.includes("Skills")) {
    return "🧠 Skills: JavaScript, TypeScript, React, Next.js, Node.js, Python, SQL.";
  }

  if (prompt.includes("Contact")) {
    return "📬 Email: benjamin@example.com | GitHub: github.com/benjamin";
  }

  return `🤖 I am Benjamin's assistant. You asked: ${prompt}`;
}
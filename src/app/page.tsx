import Link from "next/link";
import ChatBot from "../components/ChatBot";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="p-4">
        <Link href="/cv" className="text-blue-600 underline">
          Go to CV Page
        </Link>
      </div>

      <ChatBot />
    </main>
  );
}
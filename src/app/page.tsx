import TypingTest from "@/components/TypingTest";
import { Zap } from "lucide-react";
import Auth from "@/components/Auth";
import Leaderboard from "@/components/Leaderboard";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a1a] via-background to-background">
      {/* Header */}
      <header className="w-full max-w-6xl flex items-center justify-between mb-12">
        <div className="flex items-center gap-2">
          <Zap className="text-primary w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tighter text-gradient">TypeBlitz</h1>
        </div>

        <div className="flex items-center gap-4">
          <Leaderboard />
          <Auth />
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full flex-1 flex flex-col items-center justify-center">
        <TypingTest />
      </div>

      {/* Footer */}
      <footer className="w-full max-w-6xl mt-12 flex justify-between text-muted text-sm">
        <p>© 2025 TypeBlitz. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </footer>
    </main>
  );
}

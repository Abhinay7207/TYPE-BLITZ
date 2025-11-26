"use client";

import { Trophy, Flame, Type } from "lucide-react";

interface StatsProps {
    wpm: number;
    accuracy: number;
    wordsTyped?: number;
    streak?: number;
    personalBest?: { wpm: number; accuracy: number };
}

export default function Stats({ wpm, accuracy, wordsTyped = 0, streak = 0, personalBest }: StatsProps) {
    const isNewBest = personalBest && wpm > personalBest.wpm;

    return (
        <div className="flex gap-4 mt-8 flex-wrap justify-center">
            {/* WPM */}
            <div className="glass-panel p-4 rounded-xl flex flex-col items-center min-w-[100px] relative">
                {isNewBest && (
                    <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1">
                        <Trophy size={12} className="text-white" />
                    </div>
                )}
                <span className="text-xs text-muted uppercase tracking-wider">WPM</span>
                <span className="text-3xl font-bold text-primary">{Math.round(wpm)}</span>
            </div>

            {/* Accuracy */}
            <div className="glass-panel p-4 rounded-xl flex flex-col items-center min-w-[100px]">
                <span className="text-xs text-muted uppercase tracking-wider">Accuracy</span>
                <span className="text-3xl font-bold text-secondary">{Math.round(accuracy)}%</span>
            </div>

            {/* Words Typed */}
            <div className="glass-panel p-4 rounded-xl flex flex-col items-center min-w-[100px]">
                <span className="text-xs text-muted uppercase tracking-wider flex items-center gap-1">
                    <Type size={12} />
                    Words
                </span>
                <span className="text-3xl font-bold text-cyan-400">{wordsTyped}</span>
            </div>

            {/* Streak */}
            {streak > 5 && (
                <div className="glass-panel p-4 rounded-xl flex flex-col items-center min-w-[100px] border-orange-500/30">
                    <span className="text-xs text-muted uppercase tracking-wider flex items-center gap-1">
                        <Flame size={12} className="text-orange-500" />
                        Streak
                    </span>
                    <span className="text-3xl font-bold text-orange-500">{streak}</span>
                </div>
            )}
        </div>
    );
}

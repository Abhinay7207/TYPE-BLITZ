"use client";

import clsx from "clsx";
import { Zap, Target, Flame } from "lucide-react";
import type { Difficulty } from "@/lib/textGenerator";

interface DifficultySelectorProps {
    difficulty: Difficulty;
    onSelect: (difficulty: Difficulty) => void;
}

export default function DifficultySelector({ difficulty, onSelect }: DifficultySelectorProps) {
    const options: { value: Difficulty; label: string; icon: typeof Zap; color: string }[] = [
        { value: 'easy', label: 'Easy', icon: Zap, color: 'text-green-400' },
        { value: 'medium', label: 'Medium', icon: Target, color: 'text-yellow-400' },
        { value: 'hard', label: 'Hard', icon: Flame, color: 'text-red-400' },
    ];

    return (
        <div className="flex gap-3">
            {options.map(({ value, label, icon: Icon, color }) => (
                <button
                    key={value}
                    onClick={() => onSelect(value)}
                    className={clsx(
                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        difficulty === value
                            ? "bg-primary text-white shadow-[0_0_15px_var(--primary-glow)]"
                            : "glass-button text-muted hover:text-white"
                    )}
                >
                    <Icon size={16} className={difficulty === value ? 'text-white' : color} />
                    {label}
                </button>
            ))}
        </div>
    );
}

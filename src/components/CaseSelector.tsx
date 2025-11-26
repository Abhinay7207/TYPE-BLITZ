"use client";

import clsx from "clsx";
import { Type } from "lucide-react";
import type { CaseMode } from "@/lib/textGenerator";

interface CaseSelectorProps {
    caseMode: CaseMode;
    onSelect: (mode: CaseMode) => void;
}

export default function CaseSelector({ caseMode, onSelect }: CaseSelectorProps) {
    const options: { value: CaseMode; label: string }[] = [
        { value: 'lower', label: 'abc' },
        { value: 'upper', label: 'ABC' },
        { value: 'mixed', label: 'AbC' },
    ];

    return (
        <div className="flex gap-2">
            {options.map(({ value, label }) => (
                <button
                    key={value}
                    onClick={() => onSelect(value)}
                    className={clsx(
                        "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-mono font-bold transition-all",
                        caseMode === value
                            ? "bg-secondary text-white shadow-[0_0_15px_var(--secondary-glow)]"
                            : "glass-button text-muted hover:text-white"
                    )}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}

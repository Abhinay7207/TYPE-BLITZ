"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Timer from "./Timer";
import Stats from "./Stats";
import DifficultySelector from "./DifficultySelector";
import CaseSelector from "./CaseSelector";
import ProgressBar from "./ProgressBar";
import { RefreshCw } from "lucide-react";
import clsx from "clsx";
import { supabase } from "@/lib/supabaseClient";
import { generateText, type Difficulty, type CaseMode } from "@/lib/textGenerator";

export default function TypingTest() {
    const [difficulty, setDifficulty] = useState<Difficulty>('medium');
    const [caseMode, setCaseMode] = useState<CaseMode>('lower');
    const [text, setText] = useState("");
    const [userInput, setUserInput] = useState("");
    const [timeLeft, setTimeLeft] = useState(60);
    const [duration, setDuration] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [wordsTyped, setWordsTyped] = useState(0);
    const [streak, setStreak] = useState(0);
    const [personalBest, setPersonalBest] = useState<{ wpm: number; accuracy: number } | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const startTimeRef = useRef<number | null>(null);
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Generate initial text
    useEffect(() => {
        setText(generateText(difficulty, caseMode, 100));
    }, [difficulty, caseMode]);

    // Load personal best from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('typeblitz_pb');
        if (saved) {
            setPersonalBest(JSON.parse(saved));
        }
    }, []);

    const calculateStats = useCallback(() => {
        if (!startTimeRef.current) return;

        const elapsedSeconds = (Date.now() - startTimeRef.current) / 1000;
        const minutes = elapsedSeconds / 60;

        // Calculate accuracy
        let correctChars = 0;
        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] === text[i]) correctChars++;
        }
        const currentAccuracy = userInput.length > 0 ? (correctChars / userInput.length) * 100 : 100;

        // Calculate WPM based on standard 5 chars per word and accuracy
        // Gross WPM = (All Typed Entries / 5) / Time (min)
        // Net WPM = Gross WPM * (Accuracy / 100)
        const grossWpm = minutes > 0 ? (userInput.length / 5) / minutes : 0;
        const netWpm = grossWpm * (currentAccuracy / 100);

        // Actual words count for display
        const words = userInput.trim().split(/\s+/).filter(w => w.length > 0).length;

        setWpm(Math.max(0, netWpm));
        setAccuracy(currentAccuracy);
        setWordsTyped(words);
    }, [userInput, text]);

    // Accurate timer using Date.now()
    useEffect(() => {
        if (isActive && startTimeRef.current) {
            timerIntervalRef.current = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTimeRef.current!) / 1000);
                const remaining = duration - elapsed;

                if (remaining <= 0) {
                    setTimeLeft(0);
                    setIsActive(false);
                    setIsFinished(true);
                    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
                } else {
                    setTimeLeft(remaining);
                }

                calculateStats();
            }, 100); // Update every 100ms for smooth display

            return () => {
                if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            };
        }
    }, [isActive, duration, calculateStats]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isFinished) return;

        const value = e.target.value;

        // Start timer on first keystroke
        if (!isActive && !isFinished) {
            setIsActive(true);
            startTimeRef.current = Date.now();
        }

        // Calculate streak
        if (value.length > userInput.length) {
            const newChar = value[value.length - 1];
            const expectedChar = text[value.length - 1];
            if (newChar === expectedChar) {
                setStreak(prev => prev + 1);
            } else {
                setStreak(0);
            }
        }

        setUserInput(value);
    };

    const resetTest = () => {
        setIsActive(false);
        setIsFinished(false);
        setTimeLeft(duration);
        setUserInput("");
        setWpm(0);
        setAccuracy(100);
        setWordsTyped(0);
        setStreak(0);
        startTimeRef.current = null;
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        setText(generateText(difficulty, caseMode, 100));
        if (inputRef.current) inputRef.current.focus();
    };

    const setTime = (time: number) => {
        setDuration(time);
        setTimeLeft(time);
        resetTest();
    };

    const handleDifficultyChange = (newDifficulty: Difficulty) => {
        setDifficulty(newDifficulty);
        resetTest();
    };

    const handleCaseModeChange = (newMode: CaseMode) => {
        setCaseMode(newMode);
        resetTest();
    };

    // Save personal best
    useEffect(() => {
        if (isFinished && wpm > 0) {
            if (!personalBest || wpm > personalBest.wpm) {
                const newBest = { wpm, accuracy };
                setPersonalBest(newBest);
                localStorage.setItem('typeblitz_pb', JSON.stringify(newBest));
            }
        }
    }, [isFinished, wpm, accuracy, personalBest]);

    // Focus input on load
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    const progress = text.length > 0 ? (userInput.length / text.length) * 100 : 0;

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-8">
            {/* Controls Row 1: Time Duration */}
            <div className="flex gap-4 mb-4">
                {[60, 120, 180].map((t) => (
                    <button
                        key={t}
                        onClick={() => setTime(t)}
                        disabled={isActive}
                        className={clsx(
                            "px-4 py-2 rounded-full text-sm font-medium transition-all",
                            duration === t
                                ? "bg-primary text-white shadow-[0_0_15px_var(--primary-glow)]"
                                : "glass-button text-muted hover:text-white",
                            isActive && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {t / 60} min
                    </button>
                ))}
            </div>

            {/* Controls Row 2: Difficulty & Case */}
            <div className="flex gap-6 mb-6 flex-wrap justify-center">
                <DifficultySelector
                    difficulty={difficulty}
                    onSelect={handleDifficultyChange}
                />
                <CaseSelector
                    caseMode={caseMode}
                    onSelect={handleCaseModeChange}
                />
            </div>

            {/* Timer */}
            <div className="mb-6">
                <Timer timeLeft={timeLeft} totalTime={duration} />
            </div>

            {/* Progress Bar */}
            <div className="w-full mb-6">
                <ProgressBar progress={Math.min(progress, 100)} />
            </div>

            {/* Text Display */}
            <div
                className="relative w-full glass-panel p-8 rounded-2xl min-h-[200px] text-2xl leading-relaxed font-mono cursor-text"
                onClick={() => inputRef.current?.focus()}
            >
                <div className="break-words pointer-events-none select-none">
                    {text.split("").map((char, index) => {
                        let color = "text-muted";
                        let bg = "transparent";

                        if (index < userInput.length) {
                            if (userInput[index] === char) {
                                color = "text-white";
                            } else {
                                color = "text-red-500";
                                bg = "rgba(239, 68, 68, 0.2)";
                            }
                        } else if (index === userInput.length) {
                            return (
                                <span key={index} className="relative text-muted border-l-2 border-primary animate-pulse">
                                    {char}
                                </span>
                            );
                        }

                        return (
                            <span key={index} className={color} style={{ backgroundColor: bg }}>
                                {char}
                            </span>
                        );
                    })}
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    className="absolute inset-0 opacity-0 cursor-default"
                    autoFocus
                    disabled={isFinished}
                />
            </div>

            {/* Stats & Reset */}
            <div className="flex flex-col items-center gap-4 mt-8">
                <Stats
                    wpm={wpm}
                    accuracy={accuracy}
                    wordsTyped={wordsTyped}
                    streak={streak}
                    personalBest={personalBest || undefined}
                />

                <button
                    onClick={resetTest}
                    className="p-4 rounded-full glass-button hover:rotate-180 transition-transform duration-500"
                    title="Restart Test"
                >
                    <RefreshCw size={24} />
                </button>
            </div>

            {isFinished && (
                <div className="mt-8 p-6 glass-panel rounded-xl border-primary border text-center animate-pulse-glow max-w-md">
                    <h2 className="text-2xl font-bold text-gradient mb-2">Test Complete! 🎉</h2>
                    <p className="text-muted mb-4">
                        You typed at <span className="text-white font-bold">{Math.round(wpm)} WPM</span> with{" "}
                        <span className="text-white font-bold">{Math.round(accuracy)}%</span> accuracy.
                    </p>
                    {personalBest && wpm > personalBest.wpm && (
                        <p className="text-yellow-400 font-bold mb-4">🏆 New Personal Best!</p>
                    )}
                    <SaveResult wpm={wpm} accuracy={accuracy} mode={duration.toString()} difficulty={difficulty} caseMode={caseMode} />
                </div>
            )}
        </div>
    );
}

function SaveResult({ wpm, accuracy, mode, difficulty, caseMode }: { wpm: number; accuracy: number; mode: string; difficulty: string; caseMode: string }) {
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");
    const [showNameInput, setShowNameInput] = useState(true);
    const [displayName, setDisplayName] = useState("");

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!displayName.trim()) {
            setError("Please enter your name");
            return;
        }

        try {
            const { data: { user } } = await supabase.auth.getUser();

            const { error: insertError } = await supabase.from('results').insert({
                user_id: user?.id || null,
                display_name: displayName.trim(),
                wpm,
                accuracy,
                mode: `${mode}s`,
                difficulty,
                case_mode: caseMode
            });

            if (insertError) throw insertError;

            setSaved(true);
            setShowNameInput(false);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to save score");
        }
    };

    if (saved) {
        return (
            <div className="text-center">
                <div className="text-green-400 font-bold mb-2">✓ Score saved to leaderboard!</div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 rounded-lg glass-button text-sm hover:bg-primary/10"
                >
                    View Leaderboard
                </button>
            </div>
        );
    }

    if (showNameInput) {
        return (
            <form onSubmit={handleSave} className="w-full max-w-sm mx-auto">
                <div className="mb-4">
                    <label className="block text-sm text-muted mb-2">Enter your name for the leaderboard:</label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-4 py-2 rounded-lg glass-panel border border-surface-border text-white focus:border-primary focus:outline-none"
                        autoFocus
                        maxLength={30}
                    />
                </div>
                {error && <div className="text-red-400 text-sm mb-3">{error}</div>}
                <button
                    type="submit"
                    className="w-full px-4 py-2 rounded-lg bg-primary text-white font-medium hover:shadow-[0_0_15px_var(--primary-glow)] transition-all"
                >
                    Save to Leaderboard
                </button>
                <button
                    type="button"
                    onClick={() => setShowNameInput(false)}
                    className="w-full mt-2 text-sm text-muted hover:text-white"
                >
                    Skip
                </button>
            </form>
        );
    }

    return null;
}

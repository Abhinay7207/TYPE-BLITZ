"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Trophy, Zap, Target, Flame } from "lucide-react";

interface Result {
    id: number;
    display_name: string;
    wpm: number;
    accuracy: number;
    difficulty: string;
    case_mode: string;
    created_at: string;
}

export default function Leaderboard() {
    const [results, setResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

    const fetchLeaderboard = async () => {
        setLoading(true);
        let query = supabase
            .from('results')
            .select('id, display_name, wpm, accuracy, difficulty, case_mode, created_at')
            .order('wpm', { ascending: false })
            .limit(20);

        if (filterDifficulty !== 'all') {
            query = query.eq('difficulty', filterDifficulty);
        }

        const { data, error } = await query;

        if (!error && data) {
            setResults(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isOpen) {
            fetchLeaderboard();
        }
    }, [isOpen, filterDifficulty]);

    const getDifficultyIcon = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return <Zap size={14} className="text-green-400" />;
            case 'medium': return <Target size={14} className="text-yellow-400" />;
            case 'hard': return <Flame size={14} className="text-red-400" />;
            default: return null;
        }
    };

    const getCaseBadge = (caseMode: string) => {
        const badges: Record<string, string> = {
            'lower': 'abc',
            'upper': 'ABC',
            'mixed': 'AbC'
        };
        return badges[caseMode] || caseMode;
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-button text-sm font-medium"
            >
                <Trophy size={16} />
                Leaderboard
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-3xl glass-panel rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-muted hover:text-white text-2xl"
                        >
                            ✕
                        </button>

                        <h2 className="text-3xl font-bold text-gradient mb-6 flex items-center gap-2">
                            <Trophy className="text-yellow-500" />
                            Leaderboard
                        </h2>

                        {/* Filter Buttons */}
                        <div className="flex gap-2 mb-6 flex-wrap">
                            {['all', 'easy', 'medium', 'hard'].map((diff) => (
                                <button
                                    key={diff}
                                    onClick={() => setFilterDifficulty(diff)}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${filterDifficulty === diff
                                            ? 'bg-primary text-white'
                                            : 'glass-button text-muted hover:text-white'
                                        }`}
                                >
                                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                                </button>
                            ))}
                        </div>

                        {loading ? (
                            <div className="text-center py-8 text-muted">Loading...</div>
                        ) : (
                            <div className="space-y-2">
                                {results.map((result, index) => (
                                    <div
                                        key={result.id}
                                        className={`flex items-center justify-between p-4 rounded-lg transition-all ${index < 3
                                                ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30'
                                                : 'bg-white/5 border border-white/10'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            {/* Rank */}
                                            <span className={`font-bold w-8 text-center text-xl ${index === 0 ? 'text-yellow-500' :
                                                    index === 1 ? 'text-gray-400' :
                                                        index === 2 ? 'text-orange-600' :
                                                            'text-muted'
                                                }`}>
                                                {index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`}
                                            </span>

                                            {/* Name */}
                                            <div className="flex-1">
                                                <div className="font-bold text-white text-lg">
                                                    {result.display_name}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted mt-1">
                                                    {getDifficultyIcon(result.difficulty)}
                                                    <span className="capitalize">{result.difficulty}</span>
                                                    <span className="text-muted">•</span>
                                                    <span className="font-mono">{getCaseBadge(result.case_mode)}</span>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="flex items-center gap-6">
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-primary">{Math.round(result.wpm)}</div>
                                                    <div className="text-xs text-muted">WPM</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-secondary">{Math.round(result.accuracy)}%</div>
                                                    <div className="text-xs text-muted">ACC</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {results.length === 0 && (
                                    <div className="text-center py-12 text-muted">
                                        <Trophy size={48} className="mx-auto mb-4 opacity-20" />
                                        <p>No scores yet. Be the first!</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

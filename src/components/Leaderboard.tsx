"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Trophy } from "lucide-react";

interface Result {
    id: number;
    wpm: number;
    accuracy: number;
    created_at: string;
    profiles: {
        username: string;
    } | null;
}

export default function Leaderboard() {
    const [results, setResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const fetchLeaderboard = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('results')
            .select(`
        id,
        wpm,
        accuracy,
        created_at,
        profiles (username)
      `)
            .order('wpm', { ascending: false })
            .limit(10);

        if (!error && data) {
            // @ts-ignore - Supabase types are tricky with joins sometimes
            setResults(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isOpen) {
            fetchLeaderboard();
        }
    }, [isOpen]);

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
                    <div className="w-full max-w-md glass-panel rounded-2xl p-6 relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-muted hover:text-white"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold text-gradient mb-6 flex items-center gap-2">
                            <Trophy className="text-yellow-500" />
                            Top Typists
                        </h2>

                        {loading ? (
                            <div className="text-center py-8 text-muted">Loading...</div>
                        ) : (
                            <div className="space-y-3">
                                {results.map((result, index) => (
                                    <div key={result.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                                        <div className="flex items-center gap-3">
                                            <span className={`font-bold w-6 text-center ${index < 3 ? 'text-yellow-500' : 'text-muted'}`}>
                                                #{index + 1}
                                            </span>
                                            <span className="font-medium text-white">
                                                {result.profiles?.username || 'Anonymous'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-primary">{Math.round(result.wpm)}</div>
                                                <div className="text-xs text-muted">WPM</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-bold text-secondary">{Math.round(result.accuracy)}%</div>
                                                <div className="text-xs text-muted">ACC</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {results.length === 0 && (
                                    <div className="text-center py-8 text-muted">No scores yet. Be the first!</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

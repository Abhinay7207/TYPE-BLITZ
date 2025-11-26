"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { LogIn, LogOut, User as UserIcon, Mail } from "lucide-react";

export default function Auth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [showEmailAuth, setShowEmailAuth] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
    const [error, setError] = useState("");

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);

            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                setUser(session?.user ?? null);
            });

            return () => subscription.unsubscribe();
        };

        getUser();
    }, []);

    const signInWithEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const { error } = authMode === 'signin'
                ? await supabase.auth.signInWithPassword({ email, password })
                : await supabase.auth.signUp({ email, password });

            if (error) throw error;
            setShowEmailAuth(false);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    if (loading) return null;

    if (user) {
        return (
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                    <UserIcon size={16} />
                    <span className="hidden sm:inline">{user.email}</span>
                </div>
                <button
                    onClick={signOut}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass-button text-sm font-medium hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500"
                >
                    <LogOut size={16} />
                    Sign Out
                </button>
            </div>
        );
    }

    if (showEmailAuth) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="w-full max-w-md glass-panel rounded-2xl p-6 relative">
                    <button
                        onClick={() => setShowEmailAuth(false)}
                        className="absolute top-4 right-4 text-muted hover:text-white"
                    >
                        ✕
                    </button>

                    <h2 className="text-2xl font-bold text-gradient mb-6">
                        {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
                    </h2>

                    <form onSubmit={signInWithEmail} className="space-y-4">
                        <div>
                            <label className="block text-sm text-muted mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg glass-panel border border-surface-border text-white focus:border-primary focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-muted mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg glass-panel border border-surface-border text-white focus:border-primary focus:outline-none"
                                required
                            />
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm">{error}</div>
                        )}

                        <button
                            type="submit"
                            className="w-full px-4 py-2 rounded-lg bg-primary text-white font-medium hover:shadow-[0_0_15px_var(--primary-glow)] transition-all"
                        >
                            {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
                        </button>

                        <button
                            type="button"
                            onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                            className="w-full text-sm text-muted hover:text-white"
                        >
                            {authMode === 'signin' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <button
            onClick={() => setShowEmailAuth(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass-button text-sm font-medium hover:bg-primary/10 hover:border-primary/50 hover:text-primary"
        >
            <Mail size={16} />
            Sign In
        </button>
    );
}

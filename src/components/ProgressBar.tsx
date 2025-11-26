"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
    progress: number; // 0-100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <div className="w-full h-2 bg-surface rounded-full overflow-hidden border border-surface-border">
            <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
        </div>
    );
}

"use client";

import { motion } from "framer-motion";

interface TimerProps {
    timeLeft: number;
    totalTime: number;
}

export default function Timer({ timeLeft, totalTime }: TimerProps) {
    // Calculate the circumference of the circle
    const radius = 50;
    const circumference = 2 * Math.PI * radius;

    // Calculate the stroke dashoffset based on time left
    // We want it to go counter-clockwise, so we start full and reduce
    const progress = timeLeft / totalTime;
    const dashOffset = circumference * (1 - progress);

    return (
        <div className="relative flex items-center justify-center w-32 h-32">
            {/* Background Circle */}
            <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    stroke="var(--surface-border)"
                    strokeWidth="8"
                    fill="transparent"
                />
                {/* Progress Circle */}
                <motion.circle
                    cx="64"
                    cy="64"
                    r={radius}
                    stroke="var(--primary)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={circumference}
                    animate={{ strokeDashoffset: dashOffset }}
                    transition={{ duration: 1, ease: "linear" }}
                    strokeLinecap="round"
                />
            </svg>

            {/* Text Timer */}
            <div className="text-3xl font-bold text-gradient">
                {timeLeft}
            </div>
        </div>
    );
}

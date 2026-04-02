"use client";

import { motion } from "framer-motion";

export default function CountdownTimer({
    timeLeft,
    isVisible,
}: {
    timeLeft: number;
    isVisible: boolean;
}) {
    return (
        <motion.h2
            className="text-vscode-blue text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono"
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.15 }}
        >
            {timeLeft}
        </motion.h2>
    );
}

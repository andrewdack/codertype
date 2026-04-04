"use client";
import { useRef } from "react";
import { RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function RestartButton({
    onRestart: handleRestart,
    className,
}: {
    onRestart: () => void;
    className?: string;
}) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        buttonRef.current?.blur();
        handleRestart();
    };

    return (
        <motion.button
            ref={buttonRef}
            type="button"
            className={`block rounded px-8 py-2 text-muted-foreground hover:text-foreground transition-colors ${className ?? ""}`}
            onClick={handleClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
        >
            <RotateCcw className="h-5 w-5" strokeWidth={1.5} />
        </motion.button>
    );
}

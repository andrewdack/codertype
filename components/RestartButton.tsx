"use client";
import { useRef } from "react";
import { RotateCw } from "lucide-react";

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
    }

    return (
        <button
            ref={buttonRef}
            type="button"
            className={`block rounded px-8 py-2 hover:bg-slate-700/50 ${className}`}
            onClick={handleClick}
        >
            <RotateCw className="h-6 w-6 text-muted-foreground"/>
        </button>
    );
}

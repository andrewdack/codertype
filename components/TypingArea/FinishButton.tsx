"use client";
import { useRef } from "react";
import { FlagTriangleRight } from "lucide-react";

export default function FinishButton({
    onFinish,
    className,
}: {
    onFinish: () => void;
    className?: string;
}) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        buttonRef.current?.blur();
        onFinish();
    };

    return (
        <button
            ref={buttonRef}
            type="button"
            className={`block rounded px-8 py-2 text-muted-foreground hover:text-foreground transition-colors ${className ?? ""}`}
            onClick={handleClick}
        >
            <FlagTriangleRight className="h-5 w-5" strokeWidth={1.5} />
        </button>
    );
}

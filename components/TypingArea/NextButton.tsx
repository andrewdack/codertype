"use client";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";

export default function NextButton({
    onNext,
    className,
}: {
    onNext: () => void;
    className?: string;
}) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        buttonRef.current?.blur();
        onNext();
    };

    return (
        <button
            ref={buttonRef}
            type="button"
            className={`block rounded px-8 py-2 text-muted-foreground hover:text-foreground transition-colors ${className ?? ""}`}
            onClick={handleClick}
        >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
        </button>
    );
}

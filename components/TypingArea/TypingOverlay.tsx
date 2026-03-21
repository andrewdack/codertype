import { Fragment } from "react";
import { cn } from "@/lib/utils";
import Caret from "./Caret";
import { State } from "@/hooks/useEngine";

interface TypingOverlayProps {
    code: string;
    typed: string;
    state: State;
    bracketPairs?: Map<number, number>;
    correctlyTypedOpenings?: Set<number>;
    autoCompleteBrackets?: boolean;
}

export default function TypingOverlay({
    code,
    typed,
    state,
    bracketPairs = new Map(),
    correctlyTypedOpenings = new Set(),
    autoCompleteBrackets = true,
}: TypingOverlayProps) {
    const chars = code.split("");

    // Helper to check if index is a closing bracket for a correctly typed adjacent opening
    const isAutoCompletedClosing = (index: number): boolean => {
        if (!autoCompleteBrackets) return false;
        for (const [opening, closing] of bracketPairs.entries()) {
            if (closing === index) {
                // Check if the opening was typed correctly
                // Note: typed.length - 1 is the cursor position (last typed char)
                const cursorPos = typed.length;
                const openingTypedCorrectly =
                    (cursorPos === opening + 1 && typed[opening] === code[opening]) || // Just typed the opening
                    (typed.length > opening && typed[opening] === code[opening]); // Already typed correctly

                if (openingTypedCorrectly) {
                    return true;
                }
            }
        }
        return false;
    };

    return (
        <pre className="absolute inset-0 m-0">
            <code>
                {chars.map((char, index) => {
                    const isCursor = index === typed.length;
                    const isTyped = index < typed.length;
                    const isCorrect = isTyped && typed[index] === char;
                    const isIncorrect = isTyped && !isCorrect;
                    const isNewline = char === "\n";
                    const isSpace = char === " ";
                    const isTab = char === "\t";
                    const isAutoClosed =
                        !isTyped && isAutoCompletedClosing(index);

                    return (
                        <Fragment key={index}>
                            {isCursor && <Caret blinking={state !== "run"} />}
                            {isNewline ? (
                                // newline UI
                                <span
                                    className={
                                        isIncorrect
                                            ? "text-red-400"
                                            : "text-transparent"
                                    }
                                >
                                    {isTyped && "↵"}
                                    {"\n"}
                                </span>
                            ) : (
                                // normal char UI
                                <span
                                    className={cn(
                                        "text-slate-700 opacity-75",
                                        isCorrect &&
                                            "text-transparent",
                                        isIncorrect &&
                                            "bg-red-500/30 text-transparent",
                                        isAutoClosed &&
                                            "text-transparent",
                                    )}
                                >
                                    {char}
                                </span>
                            )}
                        </Fragment>
                    );
                })}
                {typed.length >= code.length && <Caret />}
            </code>
        </pre>
    );
}

import { Fragment } from "react";
import { cn } from "@/lib/utils";
import Caret from "./Caret";
import { State } from "@/hooks/useEngine";

interface TypingOverlayProps {
    code: string;
    typed: string;
    state: State;
    charOffset?: number;    // where the visible window starts in the full code
    visibleLength?: number; // how many chars of code to render
    bracketPairs?: Map<number, number>;
    correctlyTypedOpenings?: Set<number>;
    autoCompleteBrackets?: boolean;
}

export default function TypingOverlay({
    code,
    typed,
    state,
    charOffset = 0,
    visibleLength,
    bracketPairs = new Map(),
    correctlyTypedOpenings = new Set(),
    autoCompleteBrackets = true,
}: TypingOverlayProps) {
    const endOffset = visibleLength !== undefined ? charOffset + visibleLength : code.length;
    const chars = code.split("").slice(charOffset, endOffset);

    // all indices here are full-code indices, matching bracketPairs and correctlyTypedOpenings
    const isAutoCompletedClosing = (fullIndex: number): boolean => {
        if (!autoCompleteBrackets) return false;
        for (const [opening, closing] of bracketPairs.entries()) {
            if (closing === fullIndex) {
                const cursorPos = typed.length;
                const openingTypedCorrectly =
                    (cursorPos === opening + 1 && typed[opening] === code[opening]) ||
                    (typed.length > opening && typed[opening] === code[opening]);
                if (openingTypedCorrectly) return true;
            }
        }
        return false;
    };

    return (
        <pre className="absolute inset-0 m-0">
            <code>
                {chars.map((char, i) => {
                    const fullIndex = i + charOffset;
                    const isCursor = fullIndex === typed.length;
                    const isTyped = fullIndex < typed.length;
                    const isCorrect = isTyped && typed[fullIndex] === char;
                    const isIncorrect = isTyped && !isCorrect;
                    const isNewline = char === "\n";
                    const isAutoClosed = !isTyped && isAutoCompletedClosing(fullIndex);

                    return (
                        <Fragment key={fullIndex}>
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

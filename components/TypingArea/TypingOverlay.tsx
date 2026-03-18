import { Fragment } from "react";
import { cn } from "@/lib/utils";
import Caret from "./Caret";
import { State } from "@/hooks/useEngine";

interface TypingOverlayProps {
    code: string;
    typed: string;
    state: State
}

export default function TypingOverlay({ code, typed, state }: TypingOverlayProps) {
    const chars = code.split("");

    return (
        <pre className="flex-1 overflow-auto absolute">
            <code>
                {chars.map((char, index) => {
                    const isCursor = index === typed.length;
                    const isTyped = index < typed.length;
                    const isCorrect = isTyped && typed[index] === char;
                    const isIncorrect = isTyped && !isCorrect;
                    const isNewline = char === "\n";
                    const isSpace = char === " ";

                    return (
                        <Fragment key={index}>
                            {isCursor && <Caret blinking={state !== "run"} />}
                            {isNewline ? (
                                <span
                                    className={cn(
                                        isIncorrect && "text-red-400",
                                    )}
                                >
                                    {isIncorrect && "↵"}
                                    {"\n"}
                                </span>
                            ) : (
                                <span
                                    className={cn(
                                        "text-muted-foreground",
                                        isCorrect &&
                                            !isSpace &&
                                            "text-transparent",
                                        isIncorrect && "bg-red-500/30 text-transparent",
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

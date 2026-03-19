import { Fragment } from "react";
import { cn } from "@/lib/utils";
import Caret from "./Caret";
import { State } from "@/hooks/useEngine";

interface TypingOverlayProps {
    code: string;
    typed: string;
    state: State;
}

export default function TypingOverlay({
    code,
    typed,
    state,
}: TypingOverlayProps) {
    const chars = code.split("");

    return (
        <pre className="flex-1 overflow-auto absolute ">
            <code>
                {chars.map((char, index) => {
                    const isCursor = index === typed.length;
                    const isTyped = index < typed.length;
                    const isCorrect = isTyped && typed[index] === char;
                    const isIncorrect = isTyped && !isCorrect;
                    const isNewline = char === "\n";
                    const isSpace = char === " ";
                    const isTab = char === "\t";

                    return (
                        <Fragment key={index}>
                            {isCursor && <Caret blinking={state !== "run"} />}
                            {isNewline ? (
                                // newline UI
                                <span
                                    className={
                                        isIncorrect
                                            ? "text-red-400"
                                            : "text-gray-600"
                                    }
                                >
                                    {isTyped && " ↵"}
                                    {"\n"}
                                </span>
                            ) : isTab ? (
                                // tab UI
                                // <span
                                //     className={isIncorrect ? "text-red-400" :"text-gray-600" }
                                // >
                                //     {isTyped && "⇥"}
                                //     {"\t"}
                                // </span>
                                <span>{"\t"}</span>
                            ) : (
                                // normal char UI
                                <span
                                    className={cn(
                                        "text-slate-700 opacity-75",
                                        isCorrect &&
                                            !isSpace &&
                                            "text-transparent",
                                        isIncorrect &&
                                            "bg-red-500/30 text-transparent",
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

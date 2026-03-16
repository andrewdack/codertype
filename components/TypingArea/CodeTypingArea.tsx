"use client";

import { Fragment, useState } from "react";
import Caret from "./Caret";
import { cn } from "@/lib/utils";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
    darcula,
    gradientDark,
    githubGist,
    gruvboxDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

interface TypingAreaProps {
    code: string;
    typed: string;
    language: string;
}

export default function CodeTypingArea({
    code,
    typed,
    language,
}: TypingAreaProps) {
    const lineCount = code.split("\n").length;
    const chars = code.split("");
    const [focused, setFocused] = useState(false);

    return (
        <div className="rounded-lg overflow-hidden border bg-card font-mono text-sm w-full">
            {/* Editor title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-card border-b">
                <span className="text-xs text-zinc-400 tracking-wide">
                    {language}
                </span>
            </div>

            {/* Code body */}
            <div className="flex">
                {/* Line numbers */}
                {/* <div
                    aria-hidden
                >
                    {Array.from({ length: lineCount }, (_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div> */}

                {/* Characters */}
                <SyntaxHighlighter
                    language={language}
                    style={gruvboxDark}
                    showLineNumbers={true}
                    lineNumberStyle={{color: "#71717b"}}
                    customStyle={{ background: "transparent", padding: "1rem" }}
                >
                    {code}
                    {/* <pre className="py-4 px-5 leading-6 flex-1 overflow-auto">
                        <code>
                            {chars.map((char, index) => {
                                const isCursor = index === typed.length;
                                const isTyped = index < typed.length;
                                const isCorrect =
                                    isTyped && typed[index] === char;
                                const isIncorrect = isTyped && !isCorrect;
                                const isNewline = char === "\n";
                                const isSpace = char === " ";
                                return (
                                    <Fragment key={index}>
                                        {isCursor && <Caret />}
                                        {isNewline ? (
                                            <span
                                                className={cn(
                                                    isIncorrect &&
                                                        "text-red-400",
                                                )}
                                            >
                                                {isIncorrect && "↵"}
                                                {"\n"}
                                            </span>
                                        ) : (
                                            <span
                                                className={cn(
                                                    "text-zinc-500",
                                                    isCorrect &&
                                                        !isSpace &&
                                                        "text-yellow-400",
                                                    isIncorrect &&
                                                        !isSpace &&
                                                        "text-red-400",
                                                    isIncorrect &&
                                                        isSpace &&
                                                        "bg-red-500/30",
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
                    </pre> */}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}

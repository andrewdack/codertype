"use client";

import { useMemo } from "react";
import { State } from "@/hooks/useEngine";
import LineNumbers from "./LineNumbers";
import TypingOverlay from "./TypingOverlay";

import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface TypingAreaProps {
    code: string;
    typed: string;
    language: string;
    state: State;
}

export default function CodeTypingArea({
    code,
    typed,
    language,
    state,
}: TypingAreaProps) {
    const lineCount = useMemo(() => code.split("\n").length, [code]);

    return (
        <div className="rounded-lg overflow-hidden border bg-card font-mono text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl w-full">
            {/* Editor title bar */}
            <div className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-card border-b">
                <span className="text-xs sm:text-sm text-zinc-400 tracking-wide">
                    {language}
                </span>
            </div>

            <div className="flex p-2 sm:p-3 md:p-4">
                <LineNumbers
                    lineCount={lineCount}
                    className="mr-2 sm:mr-3 md:mr-4"
                />
                <div className="relative flex">
                    {/* Characters */}
                    <SyntaxHighlighter
                        language={language}
                        style={atomOneDark}
                        // showLineNumbers={true}
                        lineNumberStyle={{ color: "#71717b" }}
                        customStyle={{
                            background: "transparent",
                            padding: "0rem",
                        }}
                    >
                        {code}
                    </SyntaxHighlighter>
                    <TypingOverlay code={code} typed={typed} state={state} />
                </div>
            </div>
        </div>
    );
}

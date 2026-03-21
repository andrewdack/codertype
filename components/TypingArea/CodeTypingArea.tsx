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
    bracketPairs?: Map<number, number>;
    correctlyTypedOpenings?: Set<number>;
    autoCompleteBrackets?: boolean;
}

export default function CodeTypingArea({
    code,
    typed,
    language,
    state,
    bracketPairs,
    correctlyTypedOpenings,
    autoCompleteBrackets,
}: TypingAreaProps) {
    const lineCount = useMemo(() => code.split("\n").length, [code]);

    return (
        <div className="rounded-sm overflow-hidden border bg-card font-mono text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl w-full">
            {/* Editor title bar */}
            {/* <div className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-card border-b">
                <span className="text-xs sm:text-sm text-zinc-400 tracking-wide">
                    {language}
                </span>
            </div> */}

            <div className="flex p-2 sm:p-3 md:p-4 w-full">
                <LineNumbers
                    lineCount={lineCount}
                    className="mr-2 sm:mr-3 md:mr-4"
                />
                <div className="relative flex flex-1">
                    {/* Characters */}
                    <SyntaxHighlighter
                        language={language}
                        style={atomOneDark}
                        // showLineNumbers={true}
                        lineNumberStyle={{ color: "#71717b" }}
                        customStyle={{
                            background: "transparent",
                            padding: "0rem",
                            margin: "0rem",
                            inset: "0",
                            overflow: "visible", // stops the scrollbar from cutting off stuff when too big
                        }}
                    >
                        {code}
                    </SyntaxHighlighter>
                    <TypingOverlay
                        code={code}
                        typed={typed}
                        state={state}
                        bracketPairs={bracketPairs}
                        correctlyTypedOpenings={correctlyTypedOpenings}
                        autoCompleteBrackets={autoCompleteBrackets}
                    />
                </div>
            </div>
        </div>
    );
}

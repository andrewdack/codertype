"use client";

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
    state
}: TypingAreaProps) {
    const lineCount = code.split("\n").length;

    return (
        <div className="rounded-lg overflow-hidden border bg-card font-mono text-md w-full">
            {/* Editor title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-card border-b">
                <span className="text-xs text-zinc-400 tracking-wide">
                    {language}
                </span>
            </div>

            {/* Code body */}
            <div className="flex p-4">
                <LineNumbers lineCount={lineCount} className="text-md mr-4" />
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

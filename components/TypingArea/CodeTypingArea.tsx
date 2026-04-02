"use client";

import { useMemo } from "react";
import { State } from "@/hooks/useEngine";
import LineNumbers from "./LineNumbers";
import TypingOverlay from "./TypingOverlay";

import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { DEFAULT_THEME, Theme } from "../Footer/ThemeSelector";
import { motion, AnimatePresence } from "framer-motion";

interface TypingAreaProps {
    code: string;
    typed: string;
    language: string;
    state: State;
    bracketPairs?: Map<number, number>;
    correctlyTypedOpenings?: Set<number>;
    autoCompleteBrackets?: boolean;
    theme?: Theme;
}

export default function CodeTypingArea({
    code,
    typed,
    language,
    state,
    bracketPairs,
    correctlyTypedOpenings,
    autoCompleteBrackets,
    theme = atomOneDark,
}: TypingAreaProps) {
    const lineCount = useMemo(() => code.split("\n").length, [code]);

    // get rid of the bold and italic styles that mess up the overlay
    const fixedSyntaxStyle = useMemo(
        () =>
            Object.fromEntries(
                Object.entries(theme).map(([key, value]) => [
                    key,
                    { ...value, fontWeight: "normal", fontStyle: "normal" },
                ]),
            ),
        [theme],
    );

    return (
        <AnimatePresence>
            <div className="font-mono text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl w-full">
                <div className="flex pr-2 pb-2sm:pr-3 sm:pb-3 md:pr-4 md:pb-4 w-full">
                    <LineNumbers
                        lineCount={Math.max(lineCount, 10)}
                        className="mr-2 sm:mr-3 md:mr-4"
                    />
                    <motion.div
                        className="relative flex flex-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        {/* Characters */}
                        <SyntaxHighlighter
                            language={language}
                            style={fixedSyntaxStyle}
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
                    </motion.div>
                </div>
            </div>
        </AnimatePresence>
    );
}

"use client";

import { useMemo } from "react";
import { State } from "@/hooks/useEngine";
import LineNumbers from "./LineNumbers";
import TypingOverlay from "./TypingOverlay";
import useLineWindow, { VISIBLE_LINES } from "@/hooks/useLineWindow";

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
    focused?: boolean;
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
    focused = true,
}: TypingAreaProps) {
    const { windowStart, visibleCode, charOffset } = useLineWindow(code, typed);

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
                        lineCount={VISIBLE_LINES}
                        startFrom={windowStart + 1}
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
                            lineNumberStyle={{ color: "#71717b" }}
                            customStyle={{
                                background: "transparent",
                                padding: "0rem",
                                margin: "0rem",
                                inset: "0",
                                overflow: "visible", // stops the scrollbar from cutting off stuff when too big
                            }}
                        >
                            {visibleCode}
                        </SyntaxHighlighter>
                        {/* overlay receives full code/typed so bracket indices stay valid */}
                        <TypingOverlay
                            code={code}
                            typed={typed}
                            state={state}
                            charOffset={charOffset}
                            visibleLength={visibleCode.length}
                            bracketPairs={bracketPairs}
                            correctlyTypedOpenings={correctlyTypedOpenings}
                            autoCompleteBrackets={autoCompleteBrackets}
                            focused={focused}
                        />
                    </motion.div>
                </div>
            </div>
        </AnimatePresence>
    );
}

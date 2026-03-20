"use client";

import CountdownTimer from "@/components/CountdownTimer";
import RestartButton from "@/components/RestartButton";
import Results from "@/components/Results";
import CodeTypingArea from "@/components/TypingArea/CodeTypingArea";
import useEngine from "@/hooks/useEngine";
import { calculateAccuracyPercentage } from "@/utils/stats";

export default function Home() {
    const {
        state,
        words,
        timeLeft,
        typed,
        errors,
        totalTyped,
        restart,
        snippet,
        bracketPairs,
        correctlyTypedOpenings,
        autoCompleteBrackets,
        setAutoCompleteBrackets,
    } = useEngine("java");

    return (
        <main className="flex flex-col flex-1 items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 py-4 sm:py-8 w-full max-w-6xl mx-auto">
            <div className="flex items-center gap-4">
                <CountdownTimer timeLeft={timeLeft} />
                <button
                    onClick={() => setAutoCompleteBrackets(!autoCompleteBrackets)}
                    className="text-xs px-3 py-1 rounded border border-border hover:bg-muted transition-colors"
                    title="Toggle auto-complete brackets"
                >
                    Auto-complete: {autoCompleteBrackets ? "ON" : "OFF"}
                </button>
            </div>
            <CodeTypingArea
                code={words}
                typed={typed}
                language={snippet.language}
                state={state}
                bracketPairs={bracketPairs}
                correctlyTypedOpenings={correctlyTypedOpenings}
                autoCompleteBrackets={autoCompleteBrackets}
            />
            <RestartButton onRestart={restart} />
            <Results
                state={state}
                className="mt-10"
                errors={errors}
                accuracyPercentage={calculateAccuracyPercentage(
                    errors,
                    totalTyped,
                )}
                total={totalTyped}
            />
        </main>
    );
}

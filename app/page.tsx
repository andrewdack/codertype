"use client";

import CountdownTimer from "@/components/CountdownTimer";
import RestartButton from "@/components/RestartButton";
import Results from "@/components/Results";
import CodeTypingArea from "@/components/TypingArea/CodeTypingArea";
import useEngine from "@/hooks/useEngine";
import { calculateAccuracyPercentage } from "@/utils/helpers";

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
    } = useEngine("python");

    return (
        <>
            <nav></nav>
            <main className="flex flex-col min-h-screen items-center justify-center gap-4 p-12 w-full max-w-4xl mx-auto">
                <CountdownTimer timeLeft={timeLeft} />
                <CodeTypingArea
                    code={words}
                    typed={typed}
                    language={snippet.language}
                    state={state}
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
            <footer></footer>
        </>
    );
}

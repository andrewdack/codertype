"use client";

import { useState } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import RestartButton from "@/components/RestartButton";
import Footer from "@/components/Footer";
import Results from "@/components/Results";
import CodeTypingArea from "@/components/TypingArea/CodeTypingArea";
import LanguageSelectorButton from "@/components/LanguageSelector";
import useEngine from "@/hooks/useEngine";
import { Language } from "@/lib/snippets";

import * as stats from "@/utils/stats";

export default function Home() {
    // Lifted language state so LanguageSelector can change it.
    // When the user picks a new language we also call restart() so the
    // engine immediately loads a snippet in that language.
    const [selectedLanguage, setSelectedLanguage] = useState<Language>("javascript");

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
        durationMilliseconds,
    } = useEngine(selectedLanguage);

    const accuracyPercent = stats.calculateAccuracyPercentage(errors, totalTyped);
    const rawwpm = stats.calculateRawWPM(totalTyped, durationMilliseconds);
    const adjwpm = stats.calculateAdjustedWPM(rawwpm, accuracyPercent);

    function handleSelectLanguage(lang: Language) {
        setSelectedLanguage(lang);
        restart();
    }

    return (
        <>
            <main className="flex flex-col flex-1 items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 py-4 sm:py-8 w-full max-w-360 mx-auto">
                <div className="w-full flex flex-col gap-3 sm:gap-4">
                    
                    <div className="grid grid-cols-3 items-center w-full">
                        <CountdownTimer
                            timeLeft={timeLeft}
                            isVisible={state === "run"}
                        />
                        <div className="flex justify-center">
                            <LanguageSelectorButton
                                visible={state !== "run"}
                                selectedLanguage={selectedLanguage}
                                onSelectLanguage={handleSelectLanguage}
                            />
                        </div>
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
                </div>
                <RestartButton onRestart={restart} />
                <Results
                    state={state}
                    className="mt-10"
                    errors={errors}
                    accuracyPercentage={parseFloat(accuracyPercent.toFixed(2))}
                    rawwpm={parseFloat(rawwpm.toFixed(2))}
                    adjwpm={parseFloat(adjwpm.toFixed(2))}
                    total={totalTyped}
                />
            </main>
            <Footer />
        </>
    );
}

"use client";

import { useState } from "react";
import CountdownTimer from "@/components/TypingArea/CountdownTimer";
import RestartButton from "@/components/TypingArea/RestartButton";
import Footer from "@/components/Footer/Footer";
import Results from "@/components/TypingArea/Results";
import CodeTypingArea from "@/components/TypingArea/CodeTypingArea";
import LanguageSelectorButton from "@/components/TypingArea/LanguageSelector";
import useEngine from "@/hooks/useEngine";
import { Language } from "@/lib/snippets";
import { DEFAULT_THEME, Theme } from "@/components/Footer/ThemeSelector";
import { AnimatePresence, motion } from "framer-motion";
import TypingSettingsSelector from "@/components/TypingSettingsSelector";

import * as stats from "@/utils/stats";

export default function Home() {
    const [selectedLanguage, setSelectedLanguage] =
        useState<Language>("python");
    const [selectedThemeName, setSelectedThemeName] = useState(
        DEFAULT_THEME.name,
    );
    const [selectedThemeStyle, setSelectedThemeStyle] = useState<Theme>(
        DEFAULT_THEME.style,
    );

    function handleSelectTheme(name: string, style: Theme) {
        setSelectedThemeName(name);
        setSelectedThemeStyle(style);
    }

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

    const accuracyPercent = stats.calculateAccuracyPercentage(
        errors,
        totalTyped,
    );
    const rawwpm = stats.calculateRawWPM(totalTyped, durationMilliseconds);
    const adjwpm = stats.calculateAdjustedWPM(rawwpm, accuracyPercent);

    function handleSelectLanguage(lang: Language) {
        setSelectedLanguage(lang);
        restart();
    }

    const isFinished = state === "finish";

    return (
        <>
            <main className="flex flex-col flex-1 items-center gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 py-4 sm:py-8 w-full max-w-360 mx-auto">
                <TypingSettingsSelector />

                {/* typing area and results share the same space */}
                <div className="relative w-full mt-[10vh]">

                    {/* typing area: fades out on finish but stays in flow to hold height */}
                    <motion.div
                        animate={{ opacity: isFinished ? 0 : 1 }}
                        transition={{
                            duration: 0.15,
                            // delay fade-in on restart so the old snippet exits before anything is visible
                            delay: isFinished ? 0 : 0.15,
                        }}
                        className={isFinished ? "pointer-events-none" : ""}
                    >
                        <div className="flex flex-col gap-3 sm:gap-4">
                            <div className="grid grid-cols-3 items-center w-full">
                                <CountdownTimer
                                    timeLeft={timeLeft}
                                    isVisible={state === "run"}
                                />
                                <div className="flex justify-center">
                                    <LanguageSelectorButton
                                        visible={state !== "run"}
                                        snippetId={snippet.id}
                                        selectedLanguage={selectedLanguage}
                                        onSelectLanguage={handleSelectLanguage}
                                    />
                                </div>
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${snippet.id}-${selectedThemeName}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <CodeTypingArea
                                        code={words}
                                        typed={typed}
                                        language={snippet.language}
                                        state={state}
                                        bracketPairs={bracketPairs}
                                        correctlyTypedOpenings={correctlyTypedOpenings}
                                        autoCompleteBrackets={autoCompleteBrackets}
                                        theme={selectedThemeStyle}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* results: absolutely overlaid, fades in on finish */}
                    <AnimatePresence>
                        {isFinished && (
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                <Results
                                    state={state}
                                    errors={errors}
                                    accuracyPercentage={parseFloat(accuracyPercent.toFixed(2))}
                                    rawwpm={parseFloat(rawwpm.toFixed(2))}
                                    adjwpm={parseFloat(adjwpm.toFixed(2))}
                                    total={totalTyped}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <RestartButton onRestart={restart} />
            </main>
            <Footer
                selectedThemeName={selectedThemeName}
                onSelectTheme={handleSelectTheme}
            />
        </>
    );
}

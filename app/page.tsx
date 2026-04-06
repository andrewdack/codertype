"use client";

import { useEffect, useRef, useState } from "react";
import Timer from "@/components/TypingArea/Timer";
import RestartButton from "@/components/TypingArea/RestartButton";
import FinishButton from "@/components/TypingArea/FinishButton";
import NextButton from "@/components/TypingArea/NextButton";
import Footer from "@/components/Footer/Footer";
import Results from "@/components/TypingArea/Results/Results";
import CodeTypingArea from "@/components/TypingArea/CodeTypingArea";
import LanguageSelectorButton from "@/components/TypingArea/LanguageSelector";
import useEngine, { TimerMode } from "@/hooks/useEngine";
import { Language, Length } from "@/lib/snippets";
import { DEFAULT_THEME, Theme } from "@/components/Footer/ThemeSelector";
import { AnimatePresence, motion } from "framer-motion";
import TypingSettingsSelector, { TypingSettings } from "@/components/TypingSettingsSelector";

import * as stats from "@/utils/stats";

export default function Home() {
    const [selectedLanguage, setSelectedLanguage] = useState<Language>("python");
    const [selectedThemeName, setSelectedThemeName] = useState(DEFAULT_THEME.name);
    const [selectedThemeStyle, setSelectedThemeStyle] = useState<Theme>(DEFAULT_THEME.style);
    const [settings, setSettings] = useState<TypingSettings>({
        type: "time",
        time: 30,
        length: "medium",
    });
    const [focused, setFocused] = useState(true);
    const [restartCount, setRestartCount] = useState(0);
    const typingAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleMouseDown(e: MouseEvent) {
            if (typingAreaRef.current?.contains(e.target as Node)) {
                setFocused(true);
            } else {
                setFocused(false);
            }
        }
        document.addEventListener("mousedown", handleMouseDown);
        return () => document.removeEventListener("mousedown", handleMouseDown);
    }, []);

    const timerMode: TimerMode =
        settings.type === "length" || settings.time === "inf" ? "stopwatch" : "countdown";
    const countdownSeconds =
        settings.type === "time" && settings.time !== "inf" ? settings.time : 30;
    const lengthFilter: Length | undefined =
        settings.type === "length" ? settings.length : undefined;

    function handleSelectTheme(name: string, style: Theme) {
        setSelectedThemeName(name);
        setSelectedThemeStyle(style);
    }

    const {
        state,
        words,
        timerValue,
        typed,
        errors,
        totalTyped,
        restart,
        finish,
        snippet,
        bracketPairs,
        correctlyTypedOpenings,
        autoCompleteBrackets,
        setAutoCompleteBrackets,
        durationMilliseconds,
        wpmHistory
    } = useEngine(selectedLanguage, timerMode, countdownSeconds, lengthFilter, focused);

    const accuracyPercent = stats.calculateAccuracyPercentage(errors, totalTyped);

    const rawwpm = stats.calculateRawWPM(totalTyped, durationMilliseconds);
    const adjwpm = accuracyPercent < 50 ? 0 : stats.calculateAdjustedWPM(rawwpm, accuracyPercent);

    function handleRestart() {
        restart();
        setFocused(true);
        setRestartCount((c) => c + 1);
    }

    function handleSelectLanguage(lang: Language) {
        setSelectedLanguage(lang);
        handleRestart();
    }

    const isFinished = state === "finish";

    useEffect(() => {
        restart();
        setFocused(true);
    }, [settings, restart]);

    useEffect(() => {
        function handleLogoRestart() {
            handleRestart();
        }
        window.addEventListener("codertype:restart", handleLogoRestart);
        return () => window.removeEventListener("codertype:restart", handleLogoRestart);
    }, []);

    return (
        <>
            <main className="flex flex-col flex-1 items-center gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 py-4 sm:py-8 w-full max-w-360 mx-auto">
                <TypingSettingsSelector
                    settings={settings}
                    onSettingsChange={setSettings}
                    visible={state === "start"}
                />

                {/* typing area and results swap via AnimatePresence */}
                <div className="w-full mt-[10vh]">
                    <AnimatePresence mode="wait">
                        {!isFinished ? (
                            <motion.div
                                key="typing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                <div className="flex flex-col gap-3 sm:gap-4">
                                    <div className="grid grid-cols-3 items-center w-full">
                                        <Timer
                                            value={timerValue}
                                            mode={timerMode}
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
                                            <div ref={typingAreaRef}>
                                                <CodeTypingArea
                                                    code={words}
                                                    typed={typed}
                                                    language={snippet.language}
                                                    state={state}
                                                    bracketPairs={bracketPairs}
                                                    correctlyTypedOpenings={correctlyTypedOpenings}
                                                    autoCompleteBrackets={autoCompleteBrackets}
                                                    theme={selectedThemeStyle}
                                                    focused={focused}
                                                />
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="results"
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
                                    durationMilliseconds={durationMilliseconds}
                                    settings={settings}
                                    language={selectedLanguage}
                                    wpmHistory={wpmHistory}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex items-center">
                    <AnimatePresence>
                        {isFinished && (
                            <NextButton key="next" onNext={handleRestart} />
                        )}
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                        <RestartButton key={restartCount} onRestart={handleRestart} />
                    </AnimatePresence>
                    <AnimatePresence>
                        {settings.time === "inf" && state === "run" && (
                            <FinishButton key="finish" onFinish={finish} />
                        )}
                    </AnimatePresence>
                </div>
            </main>
            <Footer
                selectedThemeName={selectedThemeName}
                onSelectTheme={handleSelectTheme}
            />
        </>
    );
}

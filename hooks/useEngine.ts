import { useCallback, useState, useEffect, useMemo } from "react";
import useSnippet from "./useSnippet";
import useTimer, { TimerMode } from "./useTimer";
import useTypings from "./useTypings";
import { type Language, type Length } from "@/lib/snippets";
import { generateBracketPairs } from "@/utils/bracketMatching";
import {
    calculateAccuracyPercentage,
    calculateAdjustedWPM,
    calculateRawWPM,
} from "@/utils/stats";

export type State = "start" | "run" | "finish";
export type { TimerMode };

type WPMpoint = {
    timeMs: number;
    rawWpm: number;
    adjWpm: number;
    errors: number;
    totalTyped: number;
};

export default function useEngine(
    language: Language = "javascript",
    timerMode: TimerMode,
    countdownSeconds: number,
    lengthFilter?: Length,
) {
    const [state, setState] = useState<State>("start");
    const { snippet, nextSnippet } = useSnippet(language, lengthFilter);
    const {
        value: timerValue,
        start: startTimer,
        reset: resetTimer,
    } = useTimer(timerMode, countdownSeconds);

    const [autoCompleteBrackets, setAutoCompleteBrackets] = useState(true);

    const words = snippet.code;
    const [startTime, setStartTime] = useState(-1);
    const [endTime, setEndTime] = useState(-1);

    const [wpmHistory, setWpmHistory] = useState<WPMpoint[]>([]);

    const bracketPairs = useMemo(() => generateBracketPairs(words), [words]);

    const [correctlyTypedOpenings, setCorrectlyTypedOpenings] = useState<
        Set<number>
    >(new Set());

    const {
        typed,
        cursor,
        clearTyped,
        resetTotalTyped,
        totalTyped,
        totalErrors,
    } = useTypings(
        state !== "finish",
        words,
        bracketPairs,
        correctlyTypedOpenings,
        setCorrectlyTypedOpenings,
        autoCompleteBrackets,
    );

    const isStarting = state === "start" && cursor > 0;
    const areWordsFinished = typed.length === words.length;

    const calculatedErrors = useMemo(() => totalErrors, [totalErrors]);

    useEffect(() => {
        if (isStarting) {
            setState("run");
            startTimer();
            setStartTime(Date.now());
        }
    }, [isStarting, startTimer, cursor]);

    // only countdown mode ends the test when time runs out
    useEffect(() => {
        if (timerMode === "countdown" && timerValue <= 0) {
            resetTimer();
            setState("finish");
            setEndTime(Date.now());
        }
    }, [timerValue, timerMode, resetTimer]);

    useEffect(() => {
        if (areWordsFinished) {
            resetTimer();
            setState("finish");
            setEndTime(Date.now());
        }
    }, [cursor, words, typed, areWordsFinished, resetTimer]);

    useEffect(() => {
        if (!autoCompleteBrackets) {
            setCorrectlyTypedOpenings(new Set());
        }
    }, [autoCompleteBrackets]);

    // wpm tracking over time
    useEffect(() => {
        if (state !== "run") {
            return;
        }

        const interval = setInterval(() => {
            const now = Date.now();
            const elapsed = now - startTime;

            if (elapsed <= 0) return;

            const rawWpm = calculateRawWPM(totalTyped, elapsed);
            const adjWpm = calculateAdjustedWPM(
                rawWpm,
                calculateAccuracyPercentage(totalErrors, totalTyped),
            );
            setWpmHistory((prev) => {
                const newHistory = [
                    ...prev,
                    {
                        timeMs: elapsed,
                        rawWpm,
                        adjWpm,
                        errors: totalErrors,
                        totalTyped: totalTyped,
                    },
                ];
                console.log(newHistory);
                return newHistory;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [state, startTime, totalTyped, totalErrors]);

    const restart = useCallback(() => {
        resetTimer();
        resetTotalTyped();
        setState("start");
        nextSnippet();
        clearTyped();
        setCorrectlyTypedOpenings(new Set());
    }, [clearTyped, nextSnippet, resetTimer, resetTotalTyped]);

    return {
        state,
        words,
        timerValue,
        timerMode,
        typed,
        errors: calculatedErrors,
        durationMilliseconds: endTime - startTime,
        totalTyped,
        restart,
        snippet,
        bracketPairs,
        correctlyTypedOpenings,
        autoCompleteBrackets,
        setAutoCompleteBrackets,
    };
}

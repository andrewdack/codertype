import { useCallback, useState, useEffect, useMemo, useRef } from "react";
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

    // refs so the interval always reads current values without being a dep
    const totalTypedRef = useRef(totalTyped);
    const totalErrorsRef = useRef(totalErrors);
    const startTimeRef = useRef(startTime);
    useEffect(() => {
        totalTypedRef.current = totalTyped;
    }, [totalTyped]);
    useEffect(() => {
        totalErrorsRef.current = totalErrors;
    }, [totalErrors]);
    useEffect(() => {
        startTimeRef.current = startTime;
    }, [startTime]);

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

    // wpm tracking over time — only restarts when state changes, reads latest values via refs
    useEffect(() => {
        if (state !== "run") return;

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTimeRef.current;
            if (elapsed <= 0) return;

            const rawWpm = calculateRawWPM(totalTypedRef.current, elapsed);
            const adjWpm = calculateAdjustedWPM(
                rawWpm,
                calculateAccuracyPercentage(
                    totalErrorsRef.current,
                    totalTypedRef.current,
                ),
            );
            setWpmHistory((prev) => {
                const newHistory = [
                    ...prev,
                    {
                        timeMs: elapsed,
                        rawWpm,
                        adjWpm,
                        errors: totalErrorsRef.current,
                        totalTyped: totalTypedRef.current,
                    },
                ];
                console.log(newHistory);
                return newHistory;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [state]);

    const restart = useCallback(() => {
        resetTimer();
        resetTotalTyped();
        setState("start");
        nextSnippet();
        clearTyped();
        setCorrectlyTypedOpenings(new Set());
        setWpmHistory([]);
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

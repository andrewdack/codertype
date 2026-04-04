import { useCallback, useState, useEffect, useMemo, useRef } from "react";
import useSnippet from "./useSnippet";
import useTimer, { TimerMode } from "./useTimer";
import useTypings from "./useTypings";
import {
    type Language,
    type Length,
    type Snippet,
    snippetsByLanguage,
} from "@/lib/snippets";
import { generateBracketPairs } from "@/utils/bracketMatching";
import { VISIBLE_LINES } from "./useLineWindow";
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

    // true for countdown and infinite-time stopwatch (not length mode)
    const useInfiniteSnippets = timerMode === "countdown" || (timerMode === "stopwatch" && !lengthFilter);

    // appended snippets for infinite countdown mode
    const [appendedSnippets, setAppendedSnippets] = useState<Snippet[]>([]);
    const lastAppendedIdRef = useRef<string>(snippet.id);

    const appendNextSnippet = useCallback(() => {
        const pool = snippetsByLanguage[language];
        let next = pool[Math.floor(Math.random() * pool.length)];
        let attempts = 0;
        while (next.id === lastAppendedIdRef.current && attempts++ < 5) {
            next = pool[Math.floor(Math.random() * pool.length)];
        }
        lastAppendedIdRef.current = next.id;
        setAppendedSnippets((prev) => [...prev, next]);
    }, [language]);

    // reset appended snippets when base snippet changes (restart / language change);
    // pre-append if base snippet is too short to fill the visible window
    useEffect(() => {
        setAppendedSnippets([]);
        lastAppendedIdRef.current = snippet.id;
        if (useInfiniteSnippets && snippet.code.split("\n").length < VISIBLE_LINES) {
            appendNextSnippet();
        }
    }, [snippet.id, snippet.code, appendNextSnippet, useInfiniteSnippets]);

    const words = useMemo(
        () => 
        appendedSnippets.length === 0
            ? snippet.code
            : [snippet.code, ...appendedSnippets.map((s) => s.code)].join("\n\n"),
        [snippet.code, appendedSnippets],
    );

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

    // in infinite-snippet modes, append before the user reaches the end
    useEffect(() => {
        if (!useInfiniteSnippets || state !== "run") return;
        const linesRemaining = words.slice(typed.length).split("\n").length;
        if (linesRemaining > VISIBLE_LINES * 2) return;
        appendNextSnippet();
    }, [typed, words, useInfiniteSnippets, state, appendNextSnippet]);

    // words finishing only ends the run in non-infinite modes (length mode)
    useEffect(() => {
        if (areWordsFinished && !useInfiniteSnippets) {
            resetTimer();
            setState("finish");
            setEndTime(Date.now());
        }
    }, [cursor, words, typed, areWordsFinished, resetTimer, useInfiniteSnippets]);

    // stopwatch modes cap at 5 minutes
    useEffect(() => {
        if (timerMode === "stopwatch" && timerValue >= 300) {
            resetTimer();
            setState("finish");
            setEndTime(Date.now());
        }
    }, [timerValue, timerMode, resetTimer]);

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

            const rawWpm = parseFloat(
                calculateRawWPM(totalTypedRef.current, elapsed).toFixed(2),
            );
            const adjWpm = parseFloat(
                calculateAdjustedWPM(
                    rawWpm,
                    calculateAccuracyPercentage(
                        totalErrorsRef.current,
                        totalTypedRef.current,
                    ),
                ).toFixed(2),
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
        setAppendedSnippets([]);
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
        wpmHistory
    };
}

import { useCallback, useState, useEffect, useMemo } from "react";
// import useWords from "./useWords";
import useSnippet from "./useSnippet";
import useCountdownTimer from "./useCountdownTimer";
import useTypings from "./useTypings";
import { countErrors } from "@/utils/stats";
import { type Language } from "@/lib/snippets";
import { generateBracketPairs } from "@/utils/bracketMatching";

export type State = "start" | "run" | "finish";
const COUNTDOWN_SECONDS = 200;

export default function useEngine(language: Language = "javascript") {
    const [state, setState] = useState<State>("start");
    const { snippet, nextSnippet } = useSnippet(language);
    const { timeLeft, startCountdown, resetCountdown } =
        useCountdownTimer(COUNTDOWN_SECONDS);

    // Auto-complete brackets toggle
    const [autoCompleteBrackets, setAutoCompleteBrackets] = useState(true);

    const words = snippet.code;
    const [startTime, setStartTime] = useState(-1);
    const [endTime, setEndTime] = useState(-1);
    // Generate bracket pairs map when snippet changes
    const bracketPairs = useMemo(() => {
        return generateBracketPairs(words);
    }, [words]);

    // Track which opening brackets have been correctly typed
    const [correctlyTypedOpenings, setCorrectlyTypedOpenings] = useState<
        Set<number>
    >(new Set());

    const { typed, cursor, clearTyped, resetTotalTyped, totalTyped, totalErrors } =
        useTypings(
            state !== "finish",
            words,
            bracketPairs,
            correctlyTypedOpenings,
            setCorrectlyTypedOpenings,
            autoCompleteBrackets,
        );

    const isStarting = state === "start" && cursor > 0;
    const areWordsFinished = typed.length === words.length;

    // Calculate total errors: real-time tracking + additional errors from countErrors
    const calculatedErrors = useMemo(() => {
        return totalErrors + countErrors(typed, words);
    }, [totalErrors, typed, words]);

    useEffect(() => {
        if (isStarting) {
            setState("run");
            startCountdown();
            setStartTime(Date.now());
        }
    }, [isStarting, startCountdown, cursor]);

    useEffect(() => {
        if (timeLeft <= 0) {
            console.log("timer up");
            resetCountdown()
            setState("finish");
            setEndTime(Date.now());
        }
    }, [timeLeft]);

    // when the current snippet is finished, load the next one
    useEffect(() => {
        if (areWordsFinished) {
            console.log("snippet finished, loading next...");
            resetCountdown()
            setState("finish");
            setEndTime(Date.now());
        }
    }, [
        cursor,
        words,
        clearTyped,
        typed,
        areWordsFinished,
        nextSnippet,
    ]);

    // Clear correctly typed openings when auto-complete is turned off
    useEffect(() => {
        if (!autoCompleteBrackets) {
            setCorrectlyTypedOpenings(new Set());
        }
    }, [autoCompleteBrackets]);

    const restart = useCallback(() => {
        resetCountdown(); 
        resetTotalTyped();
        setState("start");
        nextSnippet();
        clearTyped();
        setCorrectlyTypedOpenings(new Set());
    }, [clearTyped, nextSnippet, resetCountdown, resetTotalTyped]);

    return {
        state,
        words,
        timeLeft,
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

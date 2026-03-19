import { useCallback, useState, useEffect } from "react";
// import useWords from "./useWords";
import useSnippet from "./useSnippet";
import useCountdownTimer from "./useCountdownTimer";
import useTypings from "./useTypings";
import { countErrors } from "@/utils/stats";
import { type Language } from "@/lib/snippets";

export type State = "start" | "run" | "finish";
// const NUMBER_OF_WORDS = 10;
const COUNTDOWN_SECONDS = 200;

export default function useEngine(language: Language = "javascript") {
    const [state, setState] = useState<State>("start");
    const { snippet, nextSnippet } = useSnippet(language);
    const { timeLeft, startCountdown, resetCountdown } =
        useCountdownTimer(COUNTDOWN_SECONDS);

    const words = snippet.code;
    const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } =
        useTypings(state !== "finish", words);
    const [errors, setErrors] = useState(0);

    const isStarting = state === "start" && cursor > 0;
    const areWordsFinished = typed.length === words.length;

    const sumErrors = useCallback(() => {
        const wordsReached = words.substring(0, cursor);
        setErrors(
            (prevErrors) => prevErrors + countErrors(typed, wordsReached),
        );
    }, [typed, words, cursor]);

    useEffect(() => {
        if (isStarting) {
            setState("run");
            startCountdown();
        }
    }, [isStarting, startCountdown, cursor]);

    useEffect(() => {
        if (timeLeft <= 0) {
            console.log("timer up");
            setState("finish");
            sumErrors();
        }
    }, [timeLeft, sumErrors]);

    // when the current snippet is finished, load the next one
    useEffect(() => {
        if (areWordsFinished) {
            console.log("snippet finished, loading next...");
            sumErrors();
            nextSnippet();
            clearTyped();
        }
    }, [
        cursor,
        words,
        clearTyped,
        typed,
        areWordsFinished,
        nextSnippet,
        sumErrors,
    ]);

    const restart = useCallback(() => {
        resetCountdown();
        resetTotalTyped();
        setState("start");
        setErrors(0);
        nextSnippet();
        clearTyped();
    }, [clearTyped, nextSnippet, resetCountdown, resetTotalTyped]);

    return { 
        state,
        words,
        timeLeft,
        typed,
        errors,
        totalTyped,
        restart,
        snippet,
    };
}

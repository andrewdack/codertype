import { useState, useEffect, useRef, useCallback } from "react";

export default function useCountdownTimer(seconds: number) {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startCountdown = useCallback(() => {
        console.log("starting countdown");
        intervalRef.current = setInterval(() => {
            setTimeLeft((timeLeft) => timeLeft - 1);
        }, 1000)
    }, [setTimeLeft]);

    const resetCountdown = useCallback(() => {
        console.log("resetting countdown...");

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        setTimeLeft(seconds);
    }, [seconds]);

    // when the countdown reaches 0, clear the interval to prevent negative time
    useEffect(() => {
        if (!timeLeft && intervalRef.current) {
            console.log("clearing timer interval");

            clearInterval(intervalRef.current);
        }
    }, [timeLeft, intervalRef]);

    return { timeLeft, startCountdown, resetCountdown };
}

/**
 * useCountdownTimer(seconds)
 *
 * What it does (high level)
 * - Manages a countdown clock that starts from `seconds` and decrements once per second.
 * - Exposes `timeLeft`, `startCountdown`, and `resetCountdown` so components can show the time,
 *   start the timer when the test begins, and reset it when the test restarts.
 *
 * Hooks used and why
 * - `useState` (`timeLeft`):
 *   - Holds the visible remaining seconds.
 *   - Changing this causes components that read `timeLeft` to re-render (so the UI updates).
 *
 * - `useRef` (`intervalRef`):
 *   - Stores the interval ID returned by `setInterval`.
 *   - `useRef` gives a mutable container that survives across renders without triggering re-renders.
 *   - We keep the id here so we can clear the interval later (stop the timer).
 *
 * - `useCallback` (`startCountdown`, `resetCountdown`):
 *   - Wraps the functions so they keep a stable identity across renders.
 *   - Useful when passing these functions to child components or effects to avoid unnecessary re-creation.
 *   - `startCountdown` starts an interval that decrements `timeLeft` every second.
 *   - `resetCountdown` clears any running interval and resets `timeLeft` back to the initial `seconds`.
 *
 * - `useEffect` (watching `timeLeft`):
 *   - Runs whenever `timeLeft` changes.
 *   - When `timeLeft` reaches 0 it clears the interval to stop the timer (prevents negative values).
 *   - Note: it's usually also good to add a cleanup effect on unmount to clear the interval as a safety net.
 *
 * Practical flow inside the typing test app
 * - When the user starts the test (first keystroke or a Start button), the UI calls `startCountdown()`.
 * - The UI renders `timeLeft` so the player sees the countdown.
 * - When `timeLeft` reaches 0 the effect clears the interval; the app can then finalize results,
 *   disable further typing, and show the score.
 * - If the user restarts, `resetCountdown()` stops the timer and sets `timeLeft` back to the original `seconds`.
 *
 * Tips & small notes
 * - Clearing intervals is important to avoid memory leaks and duplicated timers.
 * - TypeScript note: in browser environments `setInterval` returns a numeric id; some projects type it as
 *   `ReturnType<typeof setInterval>` or `number` to avoid `NodeJS.Timeout` conflicts.
 * - Consider adding an effect cleanup (return function from `useEffect`) that clears `intervalRef.current`
 *   to ensure the timer is cleared if the component unmounts unexpectedly.
 */
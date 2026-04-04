import { useState, useEffect, useRef, useCallback } from "react";

export type TimerMode = "countdown" | "stopwatch";

export default function useTimer(mode: TimerMode, seconds: number) {
    const [value, setValue] = useState(mode === "countdown" ? seconds : 0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // sync initial value when mode or seconds changes (settings change triggers restart)
    useEffect(() => {
        setValue(mode === "countdown" ? seconds : 0);
    }, [mode, seconds]);

    const start = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setValue((v) => (mode === "countdown" ? v - 1 : v + 1));
        }, 1000);
    }, [mode]);

    const reset = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setValue(mode === "countdown" ? seconds : 0);
    }, [mode, seconds]);

    // stop countdown at 0, stopwatch runs indefinitely
    useEffect(() => {
        if (mode === "countdown" && value <= 0 && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, [value, mode]);

    return { value, start, reset };
}

import { useState, useEffect, useRef, useCallback } from "react";

export default function useCountdownTimer(seconds: number) {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startCountdown = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setTimeLeft((timeLeft) => timeLeft - 1);
        }, 1000)
    }, [setTimeLeft]);

    const resetCountdown = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        setTimeLeft(seconds);
    }, [seconds]);

    // when the countdown reaches 0, clear the interval to prevent negative time
    useEffect(() => {
        if (!timeLeft && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, [timeLeft, intervalRef]);

    return { timeLeft, startCountdown, resetCountdown };
}
import { TimerMode } from "@/hooks/useEngine";

function formatTime(value: number): string {
    if (value >= 60) {
        const mins = Math.floor(value / 60);
        const secs = value % 60;
        if (mins >= 10) {
            return `${mins}:${secs.toString().padStart(2, "0")}`;
        }
        else {
            return `0${mins}:${secs.toString().padStart(2, "0")}`;
        }
    }
    return `${value}`;
}

export default function Timer({
    value,
    mode,
    isVisible = false,
}: {
    value: number;
    mode: TimerMode;
    isVisible: boolean;
}) {
    return (
        <h2
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono text-vscode-blue ${!isVisible && "invisible"}`}
        >
            {formatTime(value)}
        </h2>
    );
}

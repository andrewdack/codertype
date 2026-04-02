import { State } from "@/hooks/useEngine";
import { formatPercentage } from "@/utils/helpers";
import { Line, LineChart } from "recharts";

interface resultsType {
    state: State;
    errors: number;
    accuracyPercentage: number;
    total: number;
    rawwpm: number;
    adjwpm: number;
    className?: string;
}

export default function Results({
    state,
    errors,
    accuracyPercentage,
    total,
    rawwpm,
    adjwpm,
    className,
}: resultsType) {
    if (state !== "finish") {
        return null;
    }
    return (
        // <LineChart></LineChart>
        <ul
            className={`flex flex-col items-center text-muted-foreground space-y-3 ${className}`}
        >
            <li className="text-xl font-semibold text-foreground">RESULTS</li>
            <li><span>Accuracy: </span><span className="text-vscode-blue">{formatPercentage(accuracyPercentage)}</span></li>
            <li><span>Errors: </span><span className="text-red-500">{errors}</span></li>
            <li><span>Raw Wpm: </span><span className="text-vscode-blue">{rawwpm}</span></li>
            <li><span>Adj Wpm: </span><span className="text-vscode-blue">{adjwpm}</span></li>
            <li><span>Typed: </span><span className="text-vscode-blue">{total}</span></li>
        </ul>
    );
}

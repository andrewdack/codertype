import { State } from "@/hooks/useEngine";
import { formatPercentage } from "@/utils/helpers";

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
        <ul
            className={`flex flex-col items-center text-muted-foreground space-y-3 ${className}`}
        >
            <li className="text-xl font-semibold">RESULTS</li>
            <li>Accuracy: {formatPercentage(accuracyPercentage)}</li>
            <li className="text-red-500">Errors: {errors}</li>
            <li>Raw Wpm: {rawwpm}</li>
            <li>Adj Wpm: {adjwpm}</li>
            <li>Typed: {total}</li>
        </ul>
    );
}

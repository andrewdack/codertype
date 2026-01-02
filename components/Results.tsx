import { State } from "@/hooks/useEngine";
import { formatPercentage } from "@/utils/helpers";

interface resultsType {
    state: State;
    errors: number;
    accuracyPercentage: number;
    total: number;
    className?: string;
}

export default function Results({
    state,
    errors,
    accuracyPercentage,
    total,
    className,
}: resultsType) {
    if (state !== "finish") {
        return null;
    }
    return (
        <ul
            className={`flex flex-col items-center text-yellow-400 space-y-3 ${className}`}
        >
            <li className="text-xl font-semibold">Results</li>
            <li>Accuracy: {formatPercentage(accuracyPercentage)}</li>
            <li className="text-red-500">Errors: {errors}</li>
            <li>Typed: {total}</li>
        </ul>
    );
}

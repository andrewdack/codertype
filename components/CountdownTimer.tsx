export default function CountdownTimer({
    timeLeft,
    isVisible,
}: {
    timeLeft: number;
    isVisible: boolean;
}) {
    return (
        <h2
            className={`text-vscode-blue text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono ${isVisible ? "visible" : "invisible"}`}
        >
            {timeLeft}
        </h2>
    );
}

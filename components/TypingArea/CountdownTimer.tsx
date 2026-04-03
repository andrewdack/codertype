export default function CountdownTimer({
    timeLeft,
    isVisible = false,
}: {
    timeLeft: number;
    isVisible: boolean;
}) {
    return (
        <h2
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono text-vscode-blue ${!isVisible && "invisible"}`}
        >
            {timeLeft}
        </h2>
    );
}

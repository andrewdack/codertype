export default function CountdownTimer({timeLeft}: {timeLeft: number}) {
    return (
        <h2 className="text-muted-foreground font-medium">
            Time: {timeLeft}
        </h2>
    )
}
export default function CountdownTimer({timeLeft}: {timeLeft: number}) {
    return (
        <h2 className="text-muted-foreground text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono">
            {timeLeft}
        </h2>
    )
}
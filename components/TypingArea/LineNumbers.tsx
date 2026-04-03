export default function LineNumbers({
    lineCount,
    startFrom = 1,
    className,
}: {
    lineCount: number;
    startFrom?: number;
    className?: string;
}) {
    return (
        <div
            aria-hidden
            className={`${className} shrink-0 text-left tabular-nums text-muted-foreground`}
        >
            {Array.from({ length: lineCount }, (_, i) => (
                <div key={i} className="text-left">
                    {i + startFrom}
                </div>
            ))}
        </div>
    );
}

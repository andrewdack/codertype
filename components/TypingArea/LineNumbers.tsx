export default function LineNumbers({
    lineCount,
    className,
}: {
    lineCount: number;
    className?: string;
}) {
    return (
        <div
            aria-hidden
            className={`${className} shrink-0 text-left tabular-nums text-muted-foreground`}
        >
            {Array.from({ length: lineCount }, (_, i) => (
                <div key={i} className="text-left">
                    {i + 1}
                </div>
            ))}
        </div>
    );
}

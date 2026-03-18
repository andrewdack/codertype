export default function LineNumbers({ lineCount, className }: { lineCount: number, className?: string }) {
    {
        /* Line numbers */
    }
    return (
        <div aria-hidden className={`${className} text-muted-foreground`}>
            {Array.from({ length: lineCount }, (_, i) => (
                <div key={i}>{i + 1}</div>
            ))}
        </div>
    );
}

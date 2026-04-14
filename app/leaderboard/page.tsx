const DUMMY_ENTRIES = [
    { rank: 1, username: "bytewizard",   wpm: 187, accuracy: 98.2, language: "python",     mode: "30s" },
    { rank: 2, username: "nullptr_ex",   wpm: 174, accuracy: 97.5, language: "javascript", mode: "30s" },
    { rank: 3, username: "heapoverflow", wpm: 168, accuracy: 96.1, language: "java",       mode: "30s" },
    { rank: 4, username: "rustacean99",  wpm: 161, accuracy: 99.0, language: "python",     mode: "60s" },
    { rank: 5, username: "segfault_me",  wpm: 155, accuracy: 95.8, language: "javascript", mode: "30s" },
    { rank: 6, username: "xor_queen",    wpm: 149, accuracy: 97.3, language: "java",       mode: "60s" },
    { rank: 7, username: "devnull42",    wpm: 143, accuracy: 94.4, language: "python",     mode: "30s" },
    { rank: 8, username: "kernelpanic",  wpm: 138, accuracy: 96.7, language: "javascript", mode: "60s" },
    { rank: 9, username: "caret_mover",  wpm: 131, accuracy: 93.9, language: "java",       mode: "30s" },
    { rank: 10, username: "endianness",  wpm: 124, accuracy: 95.1, language: "python",     mode: "60s" },
];

const RANK_COLORS: Record<number, string> = {
    1: "text-yellow-400",
    2: "text-slate-300",
    3: "text-amber-600",
};

export default function LeaderboardPage() {
    return (
        <main className="flex-1 flex justify-center px-4 sm:px-6 py-10">
            <div className="w-full max-w-2xl flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-vscode-blue">leaderboard</h1>
                    <p className="text-muted-foreground text-sm">
                        top typists across all languages and modes
                    </p>
                </div>

                {/* table header */}
                <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-[2rem_1fr_5rem_5rem_6rem_4rem] gap-4 px-4 text-xs text-muted-foreground">
                        <span>#</span>
                        <span>user</span>
                        <span className="text-right">wpm</span>
                        <span className="text-right">accuracy</span>
                        <span className="text-right">language</span>
                        <span className="text-right">mode</span>
                    </div>

                    {/* rows */}
                    <div className="flex flex-col gap-1">
                        {DUMMY_ENTRIES.map((entry) => (
                            <div
                                key={entry.rank}
                                className="grid grid-cols-[2rem_1fr_5rem_5rem_6rem_4rem] gap-4 items-center bg-card rounded-lg px-4 py-3"
                            >
                                <span className={`font-bold tabular-nums text-sm ${RANK_COLORS[entry.rank] ?? "text-muted-foreground"}`}>
                                    {entry.rank}
                                </span>
                                <span className="font-medium text-foreground text-sm truncate">
                                    {entry.username}
                                </span>
                                <span className="text-right font-bold text-vscode-blue tabular-nums text-sm">
                                    {entry.wpm}
                                </span>
                                <span className="text-right text-muted-foreground tabular-nums text-sm">
                                    {entry.accuracy}%
                                </span>
                                <span className="text-right text-muted-foreground text-sm">
                                    {entry.language}
                                </span>
                                <span className="text-right text-muted-foreground text-sm">
                                    {entry.mode}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

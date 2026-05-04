"use client";

import { useEffect, useState } from "react";

type Entry = {
    username: string;
    wpm: number;
    accuracy: number;
    language: string;
    mode: string;
};

const RANK_COLORS: Record<number, string> = {
    1: "text-yellow-400",
    2: "text-slate-300",
    3: "text-amber-600",
};

const LANGUAGES = ["python", "javascript", "java", "typescript", "cpp", "csharp", "rust", "go", "ruby", "swift"];
const MODES = ["15s", "30s", "60s", "120s", "infinite", "short", "medium", "long"];

function FilterPill({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                active
                    ? "bg-card text-foreground"
                    : "text-muted-foreground hover:text-foreground"
            }`}
        >
            {label}
        </button>
    );
}

export default function LeaderboardPage() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState<string | null>(null);
    const [mode, setMode] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams();
        if (language) params.set("language", language);
        if (mode) params.set("mode", mode);

        fetch(`/api/leaderboard?${params}`)
            .then((r) => r.json())
            .then((data) => setEntries(Array.isArray(data) ? data : []))
            .finally(() => setLoading(false));
    }, [language, mode]);

    return (
        <main className="flex-1 flex justify-center px-4 sm:px-6 py-10">
            <div className="w-full max-w-2xl flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-vscode-blue">leaderboard</h1>
                    <p className="text-muted-foreground text-sm">
                        best result per user across all languages and modes
                    </p>
                </div>

                {/* filters */}
                <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-1">
                        <FilterPill label="all languages" active={language === null} onClick={() => setLanguage(null)} />
                        {LANGUAGES.map((l) => (
                            <FilterPill key={l} label={l} active={language === l} onClick={() => setLanguage(l)} />
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                        <FilterPill label="all modes" active={mode === null} onClick={() => setMode(null)} />
                        {MODES.map((m) => (
                            <FilterPill key={m} label={m} active={mode === m} onClick={() => setMode(m)} />
                        ))}
                    </div>
                </div>

                {/* table */}
                <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-[2rem_1fr_5rem_5rem_6rem_4rem] gap-4 px-4 text-xs text-muted-foreground">
                        <span>#</span>
                        <span>user</span>
                        <span className="text-right">wpm</span>
                        <span className="text-right">accuracy</span>
                        <span className="text-right">language</span>
                        <span className="text-right">mode</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        {loading ? (
                            <p className="text-sm text-muted-foreground px-4 py-6 text-center">loading...</p>
                        ) : entries.length === 0 ? (
                            <p className="text-sm text-muted-foreground px-4 py-6 text-center">no results yet</p>
                        ) : (
                            entries.map((entry, i) => {
                                const rank = i + 1;
                                return (
                                    <div
                                        key={`${entry.username}-${i}`}
                                        className="grid grid-cols-[2rem_1fr_5rem_5rem_6rem_4rem] gap-4 items-center bg-card rounded-lg px-4 py-3"
                                    >
                                        <span className={`font-bold tabular-nums text-sm ${RANK_COLORS[rank] ?? "text-muted-foreground"}`}>
                                            {rank}
                                        </span>
                                        <span className="font-medium text-foreground text-sm truncate">
                                            {entry.username}
                                        </span>
                                        <span className="text-right font-bold text-vscode-blue tabular-nums text-sm">
                                            {Math.floor(entry.wpm)}
                                        </span>
                                        <span className="text-right text-muted-foreground tabular-nums text-sm">
                                            {entry.accuracy.toFixed(1)}%
                                        </span>
                                        <span className="text-right text-muted-foreground text-sm">
                                            {entry.language}
                                        </span>
                                        <span className="text-right text-muted-foreground text-sm">
                                            {entry.mode}
                                        </span>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

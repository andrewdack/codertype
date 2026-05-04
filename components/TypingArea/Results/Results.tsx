import Link from "next/link";
import { State, WPMpoint } from "@/hooks/useEngine";
import { Language } from "@/lib/snippets";
import { TypingSettings } from "@/components/TypingSettingsSelector";
import StatChart from "./StatChart";

interface ResultsProps {
    state: State;
    errors: number;
    accuracyPercentage: number;
    total: number;
    rawwpm: number;
    adjwpm: number;
    durationMilliseconds: number;
    settings: TypingSettings;
    language: Language;
    wpmHistory: WPMpoint[];
    isLoggedIn: boolean;
    className?: string;
}

function MainStat({
    value,
    label,
    suffix = "",
}: {
    value: number;
    label: string;
    suffix?: string;
}) {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-5xl xl:text-6xl font-bold text-vscode-blue leading-none tabular-nums">
                {Math.floor(value)}
                {suffix}
            </span>
            <span className="text-xs text-muted-foreground tabular-nums">
                {value.toFixed(2)}
                {suffix}
            </span>
            <span className="text-xl sm:text-3xl font-bold text-muted-foreground">
                {label}
            </span>
        </div>
    );
}

function SecondaryStat({
    label,
    value,
    sub,
    className,
}: {
    label: string;
    value: string | number;
    sub?: string;
    className?: string;
}) {
    return (
        <div className={`flex flex-col gap-2 ${className ?? ""}`}>
            <span className="text-xs sm:text-sm text-muted-foreground">
                {label}
            </span>
            <span className="text-xl sm:text-3xl font-bold text-vscode-blue leading-none tabular-nums">
                {value}
            </span>
            {sub && (
                <span className="text-xs sm:text-sm text-muted-foreground tabular-nums">
                    {sub}
                </span>
            )}
        </div>
    );
}

export default function Results({
    state,
    errors,
    accuracyPercentage,
    total,
    rawwpm,
    adjwpm,
    durationMilliseconds,
    settings,
    language,
    wpmHistory,
    isLoggedIn,
    className,
}: ResultsProps) {
    if (state !== "finish") return null;

    const timeSec = durationMilliseconds / 1000;
    const modeLabel =
        settings.type === "time"
            ? `time ${settings.time === "inf" ? "infinite" : `${settings.time}s`}`
            : settings.length;

    return (
        <div className="w-full flex flex-col gap-10">
            {/* placeholder for graph*/}
            <div className="w-full bg-card h-60 rounded-md">
                <StatChart statHistory={wpmHistory} />
            </div>
            {/* stats  */}
            <div
                className={`flex items-center gap-16 md:gap-20 w-full ${className ?? ""}`}
            >
                {/* main stats */}
                <div className="flex gap-14 md:gap-16 shrink-0">
                    <MainStat value={adjwpm} label="wpm" />
                    <MainStat
                        value={accuracyPercentage}
                        label="acc"
                        suffix="%"
                    />
                </div>
                {/* divider */}
                <div className="w-px self-stretch bg-border" />
                {/* secondary stats */}
                <div className="flex-1 grid grid-cols-3 gap-y-7">
                    <SecondaryStat
                        label="raw wpm"
                        value={Math.floor(rawwpm)}
                        sub={rawwpm.toFixed(2)}
                    />
                    <SecondaryStat
                        label="characters"
                        value={total}
                        className="text-center"
                    />
                    <SecondaryStat
                        label="errors"
                        value={errors}
                        className="text-right"
                    />
                    <SecondaryStat
                        label="time"
                        value={`${timeSec.toFixed(1)}s`}
                    />
                    <SecondaryStat
                        label="mode"
                        value={modeLabel}
                        className="text-center"
                    />
                    <SecondaryStat
                        label="language"
                        value={language}
                        className="text-right"
                    />
                </div>
            </div>
            {!isLoggedIn ? (
                <p className="text-sm text-muted-foreground text-center">
                    <Link href="/signin" className="text-foreground hover:text-vscode-blue transition-colors">
                        sign in
                    </Link>
                    {" "}to save your results
                </p>
            ) : (<div className="text-sm text-muted-foreground text-center">
                your results have been saved to your account
            </div>)}
        </div>
    );
}

import { State } from "@/hooks/useEngine";
import { Language } from "@/lib/snippets";
import { TypingSettings } from "@/components/TypingSettingsSelector";

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
        <div className="flex flex-col gap-1">
            <span className="text-5xl xl:text-6xl font-bold text-vscode-blue leading-none tabular-nums">
                {Math.floor(value)}{suffix}
            </span>
            <span className="text-xs text-muted-foreground tabular-nums">
                {value.toFixed(2)}{suffix}
            </span>
            <span className="text-xs text-muted-foreground">{label}</span>
        </div>
    );
}

function SecondaryStat({
    label,
    value,
    sub,
}: {
    label: string;
    value: string | number;
    sub?: string;
}) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">{label}</span>
            <span className="text-xl font-semibold text-foreground leading-none tabular-nums">
                {value}
            </span>
            {sub && (
                <span className="text-xs text-muted-foreground tabular-nums">{sub}</span>
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
    className,
}: ResultsProps) {
    if (state !== "finish") return null;

    const timeSec = durationMilliseconds / 1000;
    const modeLabel =
        settings.type === "time"
            ? `${settings.time === "inf" ? "∞" : settings.time}s`
            : settings.length;

    return (
        <div className={`w-full flex items-center gap-8 md:gap-12 ${className ?? ""}`}>
            {/* main stats */}
            <div className="flex gap-8 md:gap-12 shrink-0">
                <MainStat value={adjwpm} label="wpm" />
                <MainStat value={accuracyPercentage} label="acc" suffix="%" />
            </div>

            {/* divider */}
            <div className="w-px self-stretch bg-border" />

            {/* secondary stats */}
            <div className="flex-1 grid grid-cols-3 gap-x-6 gap-y-5">
                <SecondaryStat
                    label="raw wpm"
                    value={Math.floor(rawwpm)}
                    sub={rawwpm.toFixed(2)}
                />
                <SecondaryStat label="characters" value={total} />
                <SecondaryStat label="errors" value={errors} />
                <SecondaryStat
                    label="time"
                    value={`${timeSec.toFixed(1)}s`}
                />
                <SecondaryStat label="mode" value={modeLabel} />
                <SecondaryStat label="language" value={language} />
            </div>
        </div>
    );
}

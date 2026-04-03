"use client";

// component to select settings for time, difficulty, or length
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export type testingType = "time" | "length" | "difficulty";
export type difficultyLevel = "easy" | "normal" | "hard";
export type timeOption = 15 | 30 | 60 | 120;
export type lengthOption = "short" | "medium" | "long";

interface TypingSettingsSelectorProps {
    testingType?: testingType;
    difficultyLevel?: difficultyLevel;
    timeOption?: timeOption;
    lengthOption?: lengthOption;
    onTestingTypeChange?: (type: testingType) => void;
    onDifficultyChange?: (level: difficultyLevel) => void;
    onTimeChange?: (time: timeOption) => void;
    onLengthChange?: (length: lengthOption) => void;
}

function Pill({ children }: { children: React.ReactNode }) {
    return (
        <motion.div 
            layout
            className="flex items-center gap-3 bg-card px-3 py-1.5 rounded-lg text-sm text-muted-foreground"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            {children}
        </motion.div>
    );
}

function OptionBtn({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "px-2 py-0.5 transition-colors",
                active ? "text-vscode-blue" : "hover:text-foreground",
            )}
        >
            {children}
        </button>
    );
}

export default function TypingSettingsSelector({
    testingType: initialTestingType = "time",
    difficultyLevel: initialDifficulty = "normal",
    timeOption: initialTime = 30,
    lengthOption: initialLength = "medium",
    onTestingTypeChange,
    onDifficultyChange,
    onTimeChange,
    onLengthChange,
}: TypingSettingsSelectorProps) {
    const [type, setType] = useState<testingType>(initialTestingType);
    const [difficulty, setDifficulty] =
        useState<difficultyLevel>(initialDifficulty);
    const [time, setTime] = useState<timeOption>(initialTime);
    const [length, setLength] = useState<lengthOption>(initialLength);

    function handleTypeChange(t: testingType) {
        setType(t);
        onTestingTypeChange?.(t);
    }

    function handleDifficultyChange(d: difficultyLevel) {
        setDifficulty(d);
        onDifficultyChange?.(d);
    }

    function handleTimeChange(t: timeOption) {
        setTime(t);
        onTimeChange?.(t);
    }

    function handleLengthChange(l: lengthOption) {
        setLength(l);
        onLengthChange?.(l);
    }

    return (
        <div className="flex gap-3">
            <Pill>
                <OptionBtn
                    active={type === "time"}
                    onClick={() => handleTypeChange("time")}
                >
                    time
                </OptionBtn>
                <OptionBtn
                    active={type === "difficulty"}
                    onClick={() => handleTypeChange("difficulty")}
                >
                    difficulty
                </OptionBtn>
                <OptionBtn
                    active={type === "length"}
                    onClick={() => handleTypeChange("length")}
                >
                    length
                </OptionBtn>
            </Pill>

            <AnimatePresence mode="wait">
                <motion.div
                    key={type}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.10 }}
                >
                    <Pill>
                        {type === "time" && (
                            <>
                                {([15, 30, 60, 120] as timeOption[]).map(
                                    (t) => (
                                        <OptionBtn
                                            key={t}
                                            active={time === t}
                                            onClick={() => handleTimeChange(t)}
                                        >
                                            {t}
                                        </OptionBtn>
                                    ),
                                )}
                            </>
                        )}
                        {type === "difficulty" && (
                            <>
                                {(
                                    [
                                        "easy",
                                        "normal",
                                        "hard",
                                    ] as difficultyLevel[]
                                ).map((d) => (
                                    <OptionBtn
                                        key={d}
                                        active={difficulty === d}
                                        onClick={() =>
                                            handleDifficultyChange(d)
                                        }
                                    >
                                        {d}
                                    </OptionBtn>
                                ))}
                            </>
                        )}
                        {type === "length" && (
                            <>
                                {(
                                    [
                                        "short",
                                        "medium",
                                        "long",
                                    ] as lengthOption[]
                                ).map((l) => (
                                    <OptionBtn
                                        key={l}
                                        active={length === l}
                                        onClick={() => handleLengthChange(l)}
                                    >
                                        {l}
                                    </OptionBtn>
                                ))}
                            </>
                        )}
                    </Pill>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

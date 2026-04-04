"use client";

// component to select settings for time, difficulty, or length
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type testingType = "time" | "length";
export type timeOption = 15 | 30 | 60 | 120 | "inf";
export type lengthOption = "short" | "medium" | "long";

export type TypingSettings = {
    type: testingType;
    time: timeOption;
    length: lengthOption;
};

interface TypingSettingsSelectorProps {
    settings: TypingSettings;
    onSettingsChange?: (newSettings: TypingSettings) => void;
    visible?: boolean;
}

function Pill({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            layout
            className="flex items-center gap-3 bg-card px-3 py-1.5 rounded-md text-sm text-muted-foreground"
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
    settings,
    onSettingsChange,
    visible = true,
}: TypingSettingsSelectorProps) {
    function updateSettings(newPartialSettings: Partial<TypingSettings>) {
        onSettingsChange?.({
            ...settings,
            ...newPartialSettings,
        });
    }
    return (
        <motion.div
            className="flex gap-3"
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            style={{ pointerEvents: visible ? "auto" : "none" }}
            inert={visible ? undefined : true}
        >
            <Pill>
                        <OptionBtn
                            active={settings.type === "time"}
                            onClick={() => updateSettings({type: "time"})}
                        >
                            time
                        </OptionBtn>
                        <OptionBtn
                            active={settings.type === "length"}
                            onClick={() => updateSettings({type: "length"})}
                        >
                            length
                        </OptionBtn>
                    </Pill>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={settings.type}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                        >
                            <Pill>
                                {settings.type === "time" && (
                                    <>
                                        {([15, 30, 60, 120, "inf"] as timeOption[]).map(
                                            (t) => (
                                                <OptionBtn
                                                    key={t}
                                                    active={settings.time === t}
                                                    onClick={() => updateSettings({time: t})}
                                                >
                                                    {t}
                                                </OptionBtn>
                                            ),
                                        )}
                                    </>
                                )}
                                {settings.type === "length" && (
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
                                                active={settings.length === l}
                                                onClick={() => updateSettings({length: l})}
                                            >
                                                {l}
                                            </OptionBtn>
                                        ))}
                                    </>
                                )}
                            </Pill>
                        </motion.div>
                    </AnimatePresence>
        </motion.div>
    );
}

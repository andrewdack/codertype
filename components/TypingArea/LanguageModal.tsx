"use client";

import React, { useEffect, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Language, LANGUAGES, LANGUAGE_ICONS as ICONS } from "@/lib/snippets";

interface LanguageModalProps {
    isOpen: boolean;
    onClose: () => void;
    origin: { top: number; left: number; width: number; height: number };
    selectedLanguage: Language;
    onSelectLanguage: (lang: Language) => void;
}

export default function LanguageModal({
    isOpen,
    onClose,
    origin,
    selectedLanguage,
    onSelectLanguage,
}: LanguageModalProps) {
    // close on esc
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        },
        [onClose],
    );

    useEffect(() => {
        if (!isOpen) return;
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, handleKeyDown]);

    // prevents bg scrolling when open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const [hovered, setHovered] = useState<Language | null>(null);

    function handleSelect(lang: Language) {
        onSelectLanguage(lang);
        onClose();
    }

    return (
        <AnimatePresence>
            {isOpen && (
                // overlay: backdrop blur + click-outside to close
                <motion.div
                    className="fixed inset-0 z-50 backdrop-blur-xs bg-black/50"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.05 }}
                >
                    {/* card positioned directly over the button, centered on its midpoint */}
                    <motion.div
                        className="absolute bg-background border border-border rounded-lg w-64 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            top: origin.top,
                            left: origin.left + origin.width / 2,
                        }}
                        initial={{ opacity: 0, scale: 0.95, x: "-50%" }}
                        animate={{ opacity: 1, scale: 1, x: "-50%" }}
                        exit={{ opacity: 0, scale: 0.95, x: "-50%" }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                        {/* header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                            <span className="text-muted-foreground text-sm font-semibold tracking-wide">
                                languages
                            </span>
                            <button
                                onClick={onClose}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* scrollable list — built from LANGUAGES so it stays in sync with snippets */}
                        <ul className="max-h-[60vh] overflow-y-auto py-1">
                            {LANGUAGES.map((lang) => {
                                const Icon = ICONS[lang];
                                const isSelected = lang === selectedLanguage;
                                return (
                                    <li key={lang}>
                                        <button
                                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                                                isSelected
                                                    ? "text-vscode-blue"
                                                    : "text-muted-foreground hover:text-foreground"
                                            }`}
                                            onClick={() => handleSelect(lang)}
                                            onMouseEnter={() => setHovered(lang)}
                                            onMouseLeave={() => setHovered(null)}
                                        >
                                            <Icon
                                                color={
                                                    isSelected
                                                        ? "var(--vscode-blue)"
                                                        : hovered === lang
                                                          ? "var(--foreground)"
                                                          : "var(--muted-foreground)"
                                                }
                                            />
                                            <span className="text-sm">{lang}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

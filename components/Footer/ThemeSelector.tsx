"use client";

import {
    atomOneDark,
    gruvboxDark,
    dracula,
    atomOneDarkReasonable,
    gradientDark,
    atelierCaveDark,
    solarizedDark,
    dark,
    nightOwl,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CaretUp, CaretDown } from "@phosphor-icons/react";
import { useRef, useState, useEffect, CSSProperties, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Theme = { [key: string]: CSSProperties };

export const THEMES: { name: string; style: Theme }[] = [
    { name: "atom one dark", style: atomOneDark },
    { name: "atelier cave dark", style: atelierCaveDark },
    { name: "dracula", style: dracula },
    { name: "gruvbox dark", style: gruvboxDark },
    { name: "gradient dark", style: gradientDark },
    { name: "night owl", style: nightOwl },
    { name: "plain dark", style: dark },
    { name: "solarized dark", style: solarizedDark },
];

export const DEFAULT_THEME = THEMES[0];

interface ThemeSelectorProps {
    selectedThemeName: string;
    onSelectTheme: (name: string, style: Theme) => void;
}

export default function ThemeSelector({
    selectedThemeName,
    onSelectTheme,
}: ThemeSelectorProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleOutsideClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleOutsideClick);
        return () =>
            document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
    }, []);

    useEffect(() => {
        if (!open) return;
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, handleKeyDown]);

    return (
        <div className="relative" ref={ref}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="absolute bottom-full mb-2 right-0 bg-background border border-border rounded-lg w-52 shadow-2xl z-50"
                        initial={{ opacity: 0, scale: 0.95, y: 4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 4 }}
                        transition={{ duration: 0.05, ease: "easeOut" }}
                    >
                        <ul className="py-1">
                            {THEMES.map(({ name, style }) => {
                                const isSelected = name === selectedThemeName;
                                return (
                                    <li key={name}>
                                        <button
                                            className={`w-full flex items-center px-4 py-2.5 text-left text-sm transition-colors ${
                                                isSelected
                                                    ? "text-vscode-blue"
                                                    : "text-muted-foreground hover:text-foreground"
                                            }`}
                                            onClick={() => {
                                                onSelectTheme(name, style);
                                                setOpen(false);
                                            }}
                                        >
                                            {name}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                className="inline-flex items-center gap-1 leading-none hover:text-foreground transition-colors"
                onClick={() => setOpen(!open)}
            >
                {/* <Palette className="w-4 h-4 sm:w-6 sm:h-6" /> */}
                <span className="hidden sm:inline">{selectedThemeName}</span>
                {open ? (
                    <CaretDown weight="thin" className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                    <CaretUp weight="thin" className="w-3 h-3 sm:w-4 sm:h-4" />
                )}
            </button>
        </div>
    );
}

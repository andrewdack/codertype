"use client";

import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Language, LANGUAGE_ICONS as ICONS } from "@/lib/snippets";
import LanguageModal from "./LanguageModal";
import { motion, AnimatePresence } from "framer-motion";

interface LanguageSelectorProps {
    visible?: boolean;
    snippetId?: string;
    selectedLanguage: Language;
    onSelectLanguage: (lang: Language) => void;
}

export default function LanguageSelector({
    visible = true,
    snippetId,
    selectedLanguage,
    onSelectLanguage,
}: LanguageSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [hovered, setHovered] = useState<Language | null>(null);
    // origin stores the button's center so the modal can animate from it
    const [origin, setOrigin] = useState({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const ICON = ICONS[selectedLanguage];

    function handleOpen() {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setOrigin({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            });
        }
        setIsOpen(true);
    }

    return (
        <AnimatePresence mode="wait">
            {visible && (
                <motion.div
                    key={snippetId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <button
                        ref={buttonRef}
                        onClick={handleOpen}
                        className="flex items-center gap-2 px-3 py-1 rounded text-muted-foreground hover:text-foreground transition-colors text-sm"
                        onMouseEnter={() => setHovered(selectedLanguage)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <ICON
                            className="w-4 h-4"
                            color={
                                hovered === selectedLanguage
                                    ? "var(--foreground)"
                                    : "var(--muted-foreground)"
                            }
                        />
                        <span>{selectedLanguage}</span>
                        <ChevronDown className="w-3 h-3" />
                    </button>
                    <LanguageModal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        origin={origin}
                        selectedLanguage={selectedLanguage}
                        onSelectLanguage={onSelectLanguage}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

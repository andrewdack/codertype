"use client";

import { useCallback, useState, useEffect } from "react";
import {
    type Language,
    type Snippet,
    snippetsByLanguage,
} from "@/lib/snippets";

function pickRandom(language: Language): Snippet {
    const pool = snippetsByLanguage[language];
    return pool[Math.floor(Math.random() * pool.length)];
}

export default function useSnippet(language: Language = "javascript") {
    const [snippet, setSnippet] = useState<Snippet | null>(null);

    useEffect(() => {
        setSnippet(pickRandom(language));
    }, [language]);

    const nextSnippet = useCallback(() => {
        setSnippet(pickRandom(language));
    }, [language]);

    return { snippet: snippet || snippetsByLanguage[language][0], nextSnippet };
}

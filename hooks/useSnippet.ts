"use client"

import { useCallback, useState } from "react";
import { type Language, type Snippet, snippetsByLanguage } from "@/lib/snippets";

function pickRandom(language: Language): Snippet {
    const pool = snippetsByLanguage[language];
    return pool[Math.floor(Math.random() * pool.length)];
}

export default function useSnippet(language: Language = "javascript") {
    const [snippet, setSnippet] = useState<Snippet>(() => pickRandom(language));

    const nextSnippet = useCallback(() => {
        setSnippet(pickRandom(language));
    }, [language]);

    return { snippet, nextSnippet };
}

"use client";

import { useCallback, useState, useEffect } from "react";
import {
    type Language,
    type Length,
    type Snippet,
    snippetsByLanguage,
} from "@/lib/snippets";

function pickRandomFromPool(pool: Snippet[]): Snippet {
    return pool[Math.floor(Math.random() * pool.length)];
}

export default function useSnippet(language: Language = "python", lengthFilter?: Length) {
    const getPool = useCallback(() => {
        const all = snippetsByLanguage[language];
        if (!lengthFilter) return all;
        const filtered = all.filter((s) => s.length === lengthFilter);
        return filtered.length > 0 ? filtered : all;
    }, [language, lengthFilter]);

    // deterministic initial value for SSR; randomized on client after hydration via effect
    const [snippet, setSnippet] = useState<Snippet>(() => getPool()[0]);

    useEffect(() => {
        setSnippet(pickRandomFromPool(getPool()));
    }, [language, lengthFilter, getPool]);

    const nextSnippet = useCallback(() => {
        const pool = getPool();
        if (pool.length <= 1) {
            setSnippet(pool[0]);
            return;
        }
        setSnippet((current) => {
            let next = pickRandomFromPool(pool);
            let attempts = 0;
            while (next.id === current.id && attempts++ < 5) {
                next = pickRandomFromPool(pool);
            }
            return next;
        });
    }, [getPool]);

    return { snippet, nextSnippet };
}

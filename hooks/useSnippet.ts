"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import {
    type Language,
    type Snippet,
    snippetsByLanguage,
} from "@/lib/snippets";

function pickRandom(language: Language): Snippet {
    const pool = snippetsByLanguage[language];
    return pool[Math.floor(Math.random() * pool.length)];
}

export default function useSnippet(language: Language = "python") {
    const [snippet, setSnippet] = useState<Snippet>(snippetsByLanguage[language][0]);
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        setSnippet(pickRandom(language));
    }, [language]);

    const nextSnippet = useCallback(() => {
        const pool = snippetsByLanguage[language];
        if (pool.length <= 1) {
            setSnippet(pool[0]);
            return;
        }
        // use functional update to access current state and avoid stale closure
        setSnippet((current) => {
            let next = pickRandom(language);
            let attempts = 0;
            while (next.id === current.id && attempts++ < 5) {
                next = pickRandom(language);
            }
            return next;
        });
    }, [language]);

    return { snippet, nextSnippet };
}

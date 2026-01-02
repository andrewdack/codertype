"use client"

import { faker } from "@faker-js/faker";
import { useCallback, useState } from "react";

function generateFakeWords(count: number) {
    return faker.word.words(count).toLowerCase();
}

export default function useWords(count: number) {
    const [words, setWords] = useState(generateFakeWords(count));

    const updateWords = useCallback(() => {
        setWords(generateFakeWords(count));
    }, [count])

    return { words, updateWords };
}
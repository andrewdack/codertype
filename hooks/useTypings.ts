import { useCallback, useState, useRef, useEffect } from "react";

export default function useTypings(enabled: boolean) {
    const [cursor, setCursor] = useState(0);
    const [typed, setTyped] = useState<string>("");
    const totalTyped = useRef(0);

    const keydownHandler = useCallback(
        ({ key, code }: KeyboardEvent) => {
            if (!enabled || !isKeyboardCharacterAllowed(code)) {
                return;
            }

            switch (key) {
                case "Backspace":
                    setTyped((prevTypedKeys) => prevTypedKeys.slice(0, -1));
                    setCursor((cursor) => cursor - 1);
                    totalTyped.current -= 1;
                    break;
                default:
                    setTyped((prevTypedKeys) => {
                        return prevTypedKeys + key;
                    });
                    setCursor((cursor) => cursor + 1);
                    totalTyped.current += 1;
            }
        },
        [enabled]
    );

    const clearTyped = useCallback(() => {
        setTyped("");
        setCursor(0);
    }, []);

    const resetTotalTyped = useCallback(() => {
        totalTyped.current = 0;
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", keydownHandler);

        return () => {
            window.removeEventListener("keydown", keydownHandler);
        };
    }, [keydownHandler]);

    return {
        typed,
        cursor,
        clearTyped,
        resetTotalTyped,
        totalTyped: totalTyped.current,
    };
}

function isKeyboardCharacterAllowed(keyCode: string) {
    // Allow letters, digits, numpad keys, space and backspace
    // plus common punctuation used when programming.
    const prefixAllowed =
        keyCode.startsWith("Key") ||
        keyCode.startsWith("Digit") ||
        keyCode.startsWith("Numpad");

    const explicitAllowed = new Set([
        "Space",
        "Backspace",
        "Minus",
        "Equal",
        "BracketLeft",
        "BracketRight",
        "Backslash",
        "Semicolon",
        "Quote",
        "Comma",
        "Period",
        "Slash",
        "Backquote",
        "IntlBackslash",
    ]);

    return prefixAllowed || explicitAllowed.has(keyCode);
}

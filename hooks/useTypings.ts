import { useCallback, useState, useRef, useEffect } from "react";

export default function useTypings(enabled: boolean, targetCode: string = "") {
    const [cursor, setCursor] = useState(0);
    const [typed, setTyped] = useState<string>("");
    const totalTyped = useRef(0);

    // Helper function to auto-insert tabs and skip to next non-tab character
    const autoInsertTabs = useCallback((typedSoFar: string, position: number): { newTyped: string, newPosition: number } => {
        let newTyped = typedSoFar;
        let newPosition = position;
        
        while (newPosition < targetCode.length && targetCode[newPosition] === '\t') {
            newTyped += '\t';
            newPosition++;
        }
        
        return { newTyped, newPosition };
    }, [targetCode]);

    useEffect(() => {
        console.log(typed);
    }, [cursor])
    const keydownHandler = useCallback(
        (e: KeyboardEvent) => {
            if (!enabled || !isKeyboardCharacterAllowed(e.code)) {
                return;
            }

            const { key } = e;

            // Prevent default for Tab, Enter, and Backspace
            if (["Tab", "Enter", "Backspace", "/"].includes(key)) {
                e.preventDefault();
            }

            switch (key) {
                case "Backspace":
                    setTyped((prevTypedKeys) => {
                        // Remove characters including tabs
                        let newTyped = prevTypedKeys.slice(0, -1);
                        
                        return newTyped;
                    });
                    setCursor((prevCursor) => {
                        // skip backward over tabs
                        let newCursor = prevCursor;
                        
                        if (newCursor > 0) {
                            return newCursor - 1;
                        }
                        return newCursor
                    });
                    totalTyped.current -= 1;
                    break;
                case "Enter":
                    setTyped((prevTypedKeys) => {
                        const withNewline = prevTypedKeys + "\n";
                        const { newTyped } = autoInsertTabs(withNewline, cursor + 1);
                        return newTyped;
                    });
                    setCursor((prevCursor) => {
                        const { newPosition } = autoInsertTabs(typed + "\n", prevCursor + 1);
                        return newPosition;
                    });
                    totalTyped.current += 1;
                    break;
                case "Tab":
                    
                    setTyped((prevTypedKeys) => {
                        const withTab = prevTypedKeys + "\t";
                        return withTab;
                    })
                    setCursor((prevCursor) => {
                        return prevCursor + 1
                    });
                    totalTyped.current += 1;
                    break;
                default:
                    setTyped((prevTypedKeys) => {
                        const withChar = prevTypedKeys + key;
                        // const { newTyped } = autoInsertTabs(withChar, cursor + 1);
                        return withChar;
                    });
                    setCursor((prevCursor) => {
                        // const { newPosition } = autoInsertTabs(typed + key, prevCursor + 1);
                        return prevCursor + 1;
                    });
                    totalTyped.current += 1;
            }
        },
        [enabled, targetCode, autoInsertTabs, cursor, typed],
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
        "Enter",
        "Tab",
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

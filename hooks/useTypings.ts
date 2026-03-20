import { useCallback, useState, useRef, useEffect } from "react";
import { isOpeningSymbol, getClosingChar } from "@/utils/bracketMatching";

export default function useTypings(
    enabled: boolean,
    targetCode: string = "",
    bracketPairs: Map<number, number> = new Map(),
    correctlyTypedOpenings: Set<number> = new Set(),
    setCorrectlyTypedOpenings: React.Dispatch<React.SetStateAction<Set<number>>> = () => {},
    autoCompleteBrackets: boolean = true
) {
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
    }, [[]])
    const keydownHandler = useCallback(    
        (e: KeyboardEvent) => {
            if (!enabled || !isKeyboardCharacterAllowed(e.code)) {
                return;
            }

            const { key } = e;

            // Prevent default for Tab, Enter, and Backspace
            if (["Tab", "Enter", "Backspace", "/", "'"].includes(key)) {
                e.preventDefault();
            }

            switch (key) {
                case "Backspace":
                    // Prevent backspacing over tabs and newlines
                    if (typed.length > 0) {
                        const lastChar = targetCode[typed.length - 1];
                        if (lastChar === '\t' || lastChar === '\n') {
                            // Don't allow backspace over tabs or newlines
                            break;
                        }
                    }

                    if (cursor === 0) {
                        break;
                    }

                    // Check if we're deleting from an opening bracket position
                    const deletingFromIndex = cursor - 1;
                    if (autoCompleteBrackets && bracketPairs.has(deletingFromIndex)) {
                        setCorrectlyTypedOpenings((prev) => {
                            const next = new Set(prev);
                            next.delete(deletingFromIndex);
                            return next;
                        });
                    }

                    setTyped((prevTypedKeys) => {
                        let newTyped = prevTypedKeys.slice(0, -1);
                        return newTyped;
                    });
                    setCursor((prevCursor) => {
                        let newCursor = prevCursor;

                        if (newCursor > 0) {
                            return newCursor - 1;
                        }
                        return newCursor
                    });
                    totalTyped.current -= 1;
                    break;
                // case "Enter":
                //     setTyped((prevTypedKeys) => {
                //         const withNewline = prevTypedKeys + "\n";
                //         const { newTyped } = autoInsertTabs(withNewline, cursor + 1);
                //         return newTyped;
                //     });
                //     setCursor((prevCursor) => {
                //         const { newPosition } = autoInsertTabs(typed + "\n", prevCursor + 1);
                //         return newPosition;
                //     });
                //     totalTyped.current += 1;
                //     break;
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
                    // Check if we're at a closing bracket position and should auto-skip
                    if (autoCompleteBrackets) {
                        // Calculate what the cursor position will be after typing this character and auto-inserting tabs
                        let char = (key === "Enter") ? "\n" : key;
                        const { newPosition: futurePosition } = autoInsertTabs(typed + char, cursor + 1);

                        // Find if the future cursor position would be at a closing bracket
                        let openingIndex = -1;
                        for (const [opening, closing] of bracketPairs.entries()) {
                            if (closing === futurePosition) {
                                openingIndex = opening;
                                break;
                            }
                        }

                        // Check if opening was typed correctly (or is being typed correctly now)
                        const openingTypedCorrectly =
                            (cursor === openingIndex && char === targetCode[openingIndex]) || // Currently typing the opening
                            typed[openingIndex] === targetCode[openingIndex]; // Already typed correctly

                        // If at closing position and opening was/is typed correctly, auto-skip
                        if (openingIndex !== -1 && openingTypedCorrectly) {
                            // Collect the first closing bracket
                            const closingCharsToInsert: string[] = [targetCode[futurePosition]];
                            let checkPosition = futurePosition + 1;

                            // Keep checking for more consecutive closing brackets
                            while (checkPosition < targetCode.length) {
                                let foundClosing = false;

                                for (const [opening, closing] of bracketPairs.entries()) {
                                    if (closing === checkPosition) {
                                        // Check if this opening was typed correctly
                                        if (typed.length > opening && typed[opening] === targetCode[opening]) {
                                            closingCharsToInsert.push(targetCode[closing]);
                                            checkPosition++;
                                            foundClosing = true;
                                            break;
                                        }
                                    }
                                }

                                if (!foundClosing) break;
                            }

                            // Auto-append the character and all closing brackets
                            const allClosings = closingCharsToInsert.join('');
                            setTyped((prevTypedKeys) => {
                                // First add the character and auto-insert tabs
                                const withChar = prevTypedKeys + char;
                                const { newTyped: withTabs } = autoInsertTabs(withChar, cursor + 1);

                                // Then insert closing brackets at the correct position
                                return withTabs + allClosings;
                            });
                            setCursor(() => {
                                // Calculate final position: after character + tabs + closing brackets
                                const withChar = typed + char;
                                const { newPosition: tabPosition } = autoInsertTabs(withChar, cursor + 1);
                                return tabPosition + closingCharsToInsert.length;
                            });
                            totalTyped.current += 1;
                            break;
                        }
                    }

                    // Normal typing behavior
                    setTyped((prevTypedKeys) => {
                        let char = (key === "Enter") ? "\n" : key;
                        const withChar = prevTypedKeys + char;
                        const { newTyped } = autoInsertTabs(withChar, cursor + 1);
                        return newTyped;
                    });

                    setCursor((prevCursor) => {
                        let char = (key === "Enter") ? "\n" : key;
                        const { newPosition } = autoInsertTabs(typed + char, prevCursor + 1);
                        return newPosition;
                    });
                    totalTyped.current += 1;
            }
        },
        [enabled, targetCode, autoInsertTabs, cursor, typed, autoCompleteBrackets, bracketPairs, correctlyTypedOpenings, setCorrectlyTypedOpenings],
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

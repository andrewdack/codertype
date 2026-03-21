export function formatPercentage(value: number): string {
    return value.toFixed(2) + "%";
}

export function isKeyboardCharacterAllowed(keyCode: string) {
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
/**
 * Generates a map of opening bracket/symbol indices to their corresponding closing indices
 * Uses a stack-based algorithm to match pairs
 */
export function generateBracketPairs(code: string): Map<number, number> {
    const pairs = new Map<number, number>();
    const stack: Array<{ char: string; index: number }> = [];

    // Define bracket pairs
    const openingBrackets = new Set(["(", "[", "{"]);
    const closingBrackets = new Map([
        [")", "("],
        ["]", "["],
        ["}", "{"],
    ]);

    // Track quote states (since quotes open and close with same character)
    let inDoubleQuote = false;
    let inSingleQuote = false;
    let inBacktick = false;
    let doubleQuoteStart = -1;
    let singleQuoteStart = -1;
    let backtickStart = -1;

    for (let i = 0; i < code.length; i++) {
        const char = code[i];
        const prevChar = i > 0 ? code[i - 1] : "";

        // Handle escaped characters
        if (prevChar === "\\") {
            continue;
        }

        // Handle double quotes
        if (char === '"') {
            if (!inSingleQuote) {
                if (inDoubleQuote) {
                    // Closing double quote
                    pairs.set(doubleQuoteStart, i);
                    inDoubleQuote = false;
                    doubleQuoteStart = -1;
                } else {
                    // Opening double quote
                    inDoubleQuote = true;
                    doubleQuoteStart = i;
                }
            }
            continue;
        }

        // Handle single quotes
        if (char === "'") {
            if (!inDoubleQuote) {
                if (inSingleQuote) {
                    // Closing single quote
                    pairs.set(singleQuoteStart, i);
                    inSingleQuote = false;
                    singleQuoteStart = -1;
                } else {
                    // Opening single quote
                    inSingleQuote = true;
                    singleQuoteStart = i;
                }
            }
            continue;
        }

        // Handle backticks
        if (char === "`") {
            if (!inDoubleQuote && !inSingleQuote) {
                if (inBacktick) {
                    // Closing backtick
                    pairs.set(backtickStart, i);
                    inBacktick = false;
                    backtickStart = -1;
                } else {
                    // Opening backtick
                    inBacktick = true;
                    backtickStart = i;
                }
            }
            continue;
        }

        // Skip bracket matching inside quotes
        if (inDoubleQuote || inSingleQuote || inBacktick) {
            continue;
        }

        // Handle opening brackets
        if (openingBrackets.has(char)) {
            stack.push({ char, index: i });
        }

        // Handle closing brackets
        if (closingBrackets.has(char)) {
            const expectedOpening = closingBrackets.get(char);
            if (
                stack.length > 0 &&
                stack[stack.length - 1].char === expectedOpening
            ) {
                const opening = stack.pop()!;
                pairs.set(opening.index, i);
            }
        }
    }

    return pairs;
}

/**
 * Check if a character at an index is an opening bracket/symbol
 */
export function isOpeningSymbol(char: string): boolean {
    return ["(", "[", "{", '"', "'", "`"].includes(char);
}

/**
 * Check if a character at an index is a closing bracket/symbol
 */
export function isClosingSymbol(char: string): boolean {
    return [")", "]", "}", '"', "'", "`"].includes(char);
}

/**
 * Get the closing character for an opening character
 */
export function getClosingChar(openingChar: string): string {
    const map: Record<string, string> = {
        "(": ")",
        "[": "]",
        "{": "}",
        '"': '"',
        "'": "'",
        "`": "`",
    };
    return map[openingChar] || openingChar;
}

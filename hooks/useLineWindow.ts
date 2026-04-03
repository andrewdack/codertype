import { useState, useMemo, useEffect } from "react";

export const VISIBLE_LINES = 10;
// shift the window when the cursor enters this line of the visible window (1-indexed)
const SCROLL_TRIGGER_LINE = 8;

interface LineWindow {
    windowStart: number; // first visible line index (0-indexed) in the full code
    visibleCode: string; // the slice of code to display
    charOffset: number;  // character index in the full code where visibleCode begins
}

export default function useLineWindow(code: string, typed: string): LineWindow {
    const [windowStart, setWindowStart] = useState(0);

    const lines = useMemo(() => code.split("\n"), [code]);
    const totalLines = lines.length;

    // which line (0-indexed) the cursor is currently on
    const cursorLine = useMemo(() => typed.split("\n").length - 1, [typed]);

    // reset when the snippet changes
    useEffect(() => {
        setWindowStart(0);
    }, [code]);

    // advance the window when the cursor enters SCROLL_TRIGGER_LINE of the visible window
    useEffect(() => {
        const maxWindowStart = Math.max(0, totalLines - VISIBLE_LINES);
        // after a shift, cursor should land on (SCROLL_TRIGGER_LINE - 1) of the new window,
        // so: windowStart = cursorLine - (SCROLL_TRIGGER_LINE - 2)
        const desiredStart = cursorLine - (SCROLL_TRIGGER_LINE - 2);
        if (desiredStart > windowStart) {
            setWindowStart(Math.min(desiredStart, maxWindowStart));
        }
    }, [cursorLine, windowStart, totalLines]);

    const { visibleCode, charOffset } = useMemo(() => {
        const endLine = Math.min(windowStart + VISIBLE_LINES, totalLines);
        // chars before windowStart = preceding lines joined by \n, plus the trailing \n
        const charOffset =
            windowStart === 0
                ? 0
                : lines.slice(0, windowStart).join("\n").length + 1;
        const visibleCode = lines.slice(windowStart, endLine).join("\n");
        return { visibleCode, charOffset };
    }, [windowStart, lines, totalLines]);

    return { windowStart, visibleCode, charOffset };
}

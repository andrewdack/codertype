import pythonSnippets from "./python.json";
import javascriptSnippets from "./javascript.json";
import javaSnippets from "./java.json";
import { PythonPlainIcon, JavascriptPlainIcon, JavaPlainIcon, CplusplusPlainIcon, CPlainIcon, RustOriginalIcon, RubyPlainIcon, } from "@devicon/react";
import { ComponentType } from "react";

export const LANGUAGES = ["javascript", "python", "java"] as const;
export type Language = typeof LANGUAGES[number];

export type Difficulty = "easy" | "medium" | "hard";
type Icon = ComponentType<{ className?: string, color?: string }>;

// !! store the icon components as references not react components
export const LANGUAGE_ICONS: Record<Language, Icon> = {
    python: PythonPlainIcon,
    javascript: JavascriptPlainIcon,
    java: JavaPlainIcon,
    // cplusplus: <CplusplusPlainIcon />,
    // c: <CPlainIcon />,
    // rust: <RustOriginalIcon />,
    // ruby: <RubyPlainIcon />,
};

// export const LANGUAGE_ICONS_MINIMALIST: Record<Language, Icon> = {}
    

// export const LABELS: Record<Language, string> = {
//     javascript: "JavaScript",
//     python: "Python",
//     java: "Java",
// };


export type Snippet = {
    id: string;
    language: Language;
    source: string;
    difficulty: Difficulty;
    code: string;
};

export const snippetsByLanguage: Record<Language, Snippet[]> = {
    python: pythonSnippets as Snippet[],
    javascript: javascriptSnippets as Snippet[],
    java: javaSnippets as Snippet[],
};


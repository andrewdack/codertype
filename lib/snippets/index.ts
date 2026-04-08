import pythonSnippets from "./python.json";
import javascriptSnippets from "./javascript.json";
import javaSnippets from "./java.json";
import rubySnippets from "./ruby.json";
import cppSnippets from "./cpp.json";
import csharpSnippets from "./csharp.json";
import rustSnippets from "./rust.json";
import swiftSnippets from "./swift.json";
import goSnippets from "./go.json";

import {
    PythonPlainIcon,
    JavascriptPlainIcon,
    JavaPlainIcon,
    RubyPlainIcon,
    CplusplusPlainIcon,
    CsharpPlainIcon,
    RustOriginalIcon,
    SwiftPlainIcon,
    GoPlainIcon,
} from "@devicon/react";
import { ComponentType } from "react";

export const LANGUAGES = ["javascript", "python", "java", "ruby", "cpp", "csharp", "rust", "swift", "go"] as const;
export type Language = typeof LANGUAGES[number];

export type Difficulty = "easy" | "medium" | "hard";

type Icon = ComponentType<{ className?: string; color?: string }>;

// !! store icon components as references, not jsx elements
export const LANGUAGE_ICONS: Record<Language, Icon> = {
    javascript: JavascriptPlainIcon,
    python: PythonPlainIcon,
    java: JavaPlainIcon,
    ruby: RubyPlainIcon,
    cpp: CplusplusPlainIcon,
    csharp: CsharpPlainIcon,
    rust: RustOriginalIcon,
    swift: SwiftPlainIcon,
    go: GoPlainIcon,
};

export const LABELS: Record<Language, string> = {
    javascript: "JavaScript",
    python: "Python",
    java: "Java",
    ruby: "Ruby",
    cpp: "C++",
    csharp: "C#",
    rust: "Rust",
    swift: "Swift",
    go: "Go",
};

export type Length = "short" | "medium" | "long";

export type Snippet = {
    id: string;
    language: Language;
    source: string;
    difficulty: Difficulty;
    length: Length;
    code: string;
};

export const snippetsByLanguage: Record<Language, Snippet[]> = {
    python: pythonSnippets as Snippet[],
    javascript: javascriptSnippets as Snippet[],
    java: javaSnippets as Snippet[],
    ruby: rubySnippets as Snippet[],
    cpp: cppSnippets as Snippet[],
    csharp: csharpSnippets as Snippet[],
    rust: rustSnippets as Snippet[],
    swift: swiftSnippets as Snippet[],
    go: goSnippets as Snippet[],
};

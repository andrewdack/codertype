import pythonSnippets from "./python.json";
import javascriptSnippets from "./javascript.json";
import javaSnippets from "./java.json";
import rubySnippets from "./ruby.json";
import cppSnippets from "./cpp.json";
import csharpSnippets from "./csharp.json";
import rustSnippets from "./rust.json";
import swiftSnippets from "./swift.json";

import {
    PythonPlainIcon,
    JavascriptPlainIcon,
    JavaPlainIcon,
    RubyPlainIcon,
    CplusplusPlainIcon,
    CsharpPlainIcon,
    RustOriginalIcon,
    SwiftPlainIcon,
} from "@devicon/react";
import { ComponentType } from "react";

export const LANGUAGES = ["javascript", "python", "java", "ruby", "cpp", "csharp", "rust", "swift"] as const;
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
};

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
    ruby: rubySnippets as Snippet[],
    cpp: cppSnippets as Snippet[],
    csharp: csharpSnippets as Snippet[],
    rust: rustSnippets as Snippet[],
    swift: swiftSnippets as Snippet[],
};

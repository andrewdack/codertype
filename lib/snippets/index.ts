import pythonSnippets from "./python.json";
import javascriptSnippets from "./javascript.json";
import javaSnippets from "./java.json";

export type Language = "python" | "javascript" | "java";
export type Difficulty = "easy" | "medium" | "hard";

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

export const LANGUAGES: Language[] = ["javascript", "python", "java"];

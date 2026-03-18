"use client";

import { Language, snippetsByLanguage } from "@/lib/snippets";

export default function CodeLibraryPage() {
    const languages = Object.keys(snippetsByLanguage) as Language[];

    return (
        <main className="flex-1 p-12">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Code Library</h1>
                    <p className="text-muted-foreground">
                        Browse code snippets across different languages and
                        difficulties
                    </p>
                </div>

                <div className="grid gap-6">
                    {languages.map((language) => {
                        const snippets = snippetsByLanguage[language];
                        return (
                            <div
                                key={language}
                                className="border border-border rounded-lg p-6"
                            >
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold capitalize mb-1">
                                        {language}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        {snippets.length} snippet
                                        {snippets.length !== 1 ? "s" : ""}{" "}
                                        available
                                    </p>
                                </div>

                                <div className="grid gap-3">
                                    {snippets.map((snippet) => (
                                        <div
                                            key={snippet.id}
                                            className="border border-border/50 rounded p-4 hover:border-border transition-colors"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium">
                                                    {snippet.source}
                                                </span>
                                                <span className="text-xs text-muted-foreground capitalize px-2 py-1 bg-muted rounded">
                                                    {snippet.difficulty}
                                                </span>
                                            </div>
                                            <pre className="text-xs text-muted-foreground overflow-x-auto">
                                                <code>
                                                    {snippet.code.slice(0, 150)}
                                                    {snippet.code.length >
                                                        150 && "..."}
                                                </code>
                                            </pre>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

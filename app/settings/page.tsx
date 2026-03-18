"use client";

import { useState } from "react";

export default function SettingsPage() {
    const [duration, setDuration] = useState(30);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [showLineNumbers, setShowLineNumbers] = useState(true);

    return (
        <main className="flex-1 p-12">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Settings</h1>
                    <p className="text-muted-foreground">
                        Customize your typing experience
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Duration */}
                    <div className="border border-border rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Test Duration
                        </h2>
                        <div className="flex gap-2">
                            {[15, 30, 60, 120].map((time) => (
                                <button
                                    key={time}
                                    onClick={() => setDuration(time)}
                                    className={`px-4 py-2 rounded border transition-colors ${
                                        duration === time
                                            ? "border-foreground bg-muted"
                                            : "border-border hover:border-foreground/50"
                                    }`}
                                >
                                    {time}s
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Display Options */}
                    <div className="border border-border rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Display</h2>
                        <div className="space-y-3">
                            <label className="flex items-center justify-between cursor-pointer">
                                <span className="text-muted-foreground">
                                    Show line numbers
                                </span>
                                <input
                                    type="checkbox"
                                    checked={showLineNumbers}
                                    onChange={(e) =>
                                        setShowLineNumbers(e.target.checked)
                                    }
                                    className="w-4 h-4"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Sound */}
                    <div className="border border-border rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Sound</h2>
                        <label className="flex items-center justify-between cursor-pointer">
                            <span className="text-muted-foreground">
                                Enable typing sounds
                            </span>
                            <input
                                type="checkbox"
                                checked={soundEnabled}
                                onChange={(e) =>
                                    setSoundEnabled(e.target.checked)
                                }
                                className="w-4 h-4"
                            />
                        </label>
                    </div>

                    {/* Theme (placeholder) */}
                    <div className="border border-border rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Theme</h2>
                        <p className="text-sm text-muted-foreground">
                            Currently using dark theme
                        </p>
                    </div>

                    {/* Save note */}
                    <div className="text-sm text-muted-foreground text-center">
                        Settings are saved locally in your browser
                    </div>
                </div>
            </div>
        </main>
    );
}

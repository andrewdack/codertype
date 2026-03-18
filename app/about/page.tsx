import { Terminal, Code2, Zap, Target } from "lucide-react";

export default function AboutPage() {
    const features = [
        {
            icon: Terminal,
            title: "Real Code Practice",
            description:
                "Practice typing with actual code snippets from popular programming languages",
        },
        {
            icon: Code2,
            title: "Multiple Languages",
            description:
                "Support for Python, JavaScript, Java, and more programming languages",
        },
        {
            icon: Zap,
            title: "Fast & Accurate",
            description:
                "Track your WPM and accuracy with real-time feedback as you type",
        },
        {
            icon: Target,
            title: "Improve Your Skills",
            description:
                "Build muscle memory for coding patterns and common syntax",
        },
    ];

    return (
        <main className="flex-1 p-12">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4">About Codertype</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A typing test designed specifically for programmers.
                        Practice typing real code snippets to improve your
                        coding speed and accuracy.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="border border-border rounded-lg p-6"
                        >
                            <feature.icon className="w-8 h-8 mb-4 text-muted-foreground" />
                            <h3 className="text-lg font-semibold mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="border border-border rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-4">How It Works</h2>
                    <ol className="space-y-4 text-muted-foreground">
                        <li className="flex gap-3">
                            <span className="font-semibold text-foreground">
                                1.
                            </span>
                            <span>
                                Select a programming language or let the app
                                choose for you
                            </span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-semibold text-foreground">
                                2.
                            </span>
                            <span>
                                Start typing when you're ready - the timer
                                begins on your first keystroke
                            </span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-semibold text-foreground">
                                3.
                            </span>
                            <span>
                                Type the code snippet as accurately as possible
                                within 30 seconds
                            </span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-semibold text-foreground">
                                4.
                            </span>
                            <span>
                                Review your results including WPM, accuracy, and
                                errors
                            </span>
                        </li>
                    </ol>
                </div>
            </div>
        </main>
    );
}

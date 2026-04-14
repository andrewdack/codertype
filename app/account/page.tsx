import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
export default async function Account() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/signin")
    }

    // dummy stats — replace with real DB queries later
    const stats = {
        testsCompleted: 142,
        avgWpm: 87,
        bestWpm: 114,
        avgAccuracy: 96.3,
    }

    const recentResults = [
        { id: 1, language: "python", wpm: 102, accuracy: 97.1, date: "2026-04-11" },
        { id: 2, language: "javascript", wpm: 88, accuracy: 94.8, date: "2026-04-10" },
        { id: 3, language: "java", wpm: 79, accuracy: 98.2, date: "2026-04-10" },
        { id: 4, language: "python", wpm: 95, accuracy: 95.5, date: "2026-04-09" },
        { id: 5, language: "javascript", wpm: 83, accuracy: 93.1, date: "2026-04-08" },
    ]

    return (
        <main className="flex flex-col flex-1 items-center gap-8 px-4 sm:px-6 md:px-8 py-8 w-full max-w-360 mx-auto">
            {/* profile header */}
            <section className="flex flex-col items-center gap-3 w-full pt-8">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-2xl text-muted-foreground border border-border">
                    {user.email?.[0]?.toUpperCase() ?? "?"}
                </div>
                <div className="flex flex-col items-center gap-1">
                    <h1 className="text-xl text-foreground">{user.email}</h1>
                    <p className="text-sm text-muted-foreground">member since {new Date(user.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
                </div>
            </section>

            {/* stats grid */}
            <section className="w-full max-w-2xl">
                <h2 className="text-sm text-muted-foreground mb-3">stats</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="flex flex-col gap-1 border border-border rounded-lg p-4">
                        <span className="text-2xl text-foreground">{stats.testsCompleted}</span>
                        <span className="text-xs text-muted-foreground">tests completed</span>
                    </div>
                    <div className="flex flex-col gap-1 border border-border rounded-lg p-4">
                        <span className="text-2xl text-foreground">{stats.avgWpm}</span>
                        <span className="text-xs text-muted-foreground">avg wpm</span>
                    </div>
                    <div className="flex flex-col gap-1 border border-border rounded-lg p-4">
                        <span className="text-2xl text-foreground">{stats.bestWpm}</span>
                        <span className="text-xs text-muted-foreground">best wpm</span>
                    </div>
                    <div className="flex flex-col gap-1 border border-border rounded-lg p-4">
                        <span className="text-2xl text-foreground">{stats.avgAccuracy}%</span>
                        <span className="text-xs text-muted-foreground">avg accuracy</span>
                    </div>
                </div>
            </section>

            {/* recent results */}
            <section className="w-full max-w-2xl">
                <h2 className="text-sm text-muted-foreground mb-3">recent results</h2>
                <div className="flex flex-col border border-border rounded-lg overflow-hidden">
                    {recentResults.map((result, i) => (
                        <div
                            key={result.id}
                            className={`flex items-center justify-between px-4 py-3 text-sm ${i < recentResults.length - 1 ? "border-b border-border" : ""}`}
                        >
                            <span className="text-muted-foreground w-24">{result.language}</span>
                            <span className="text-foreground">{result.wpm} wpm</span>
                            <span className="text-muted-foreground">{result.accuracy}%</span>
                            <span className="text-muted-foreground text-xs">{result.date}</span>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

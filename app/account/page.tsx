import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export default async function Account() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/signin");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", user.id)
        .single();

    type UserStats = {
        tests_completed: number;
        avg_wpm: number;
        best_wpm: number;
        avg_accuracy: number;
    };
    const { data: statsRows } = await supabase.rpc("get_user_stats", { uid: user.id });
    const stats = (statsRows as UserStats[] | null)?.[0] ?? null;

    const recentResults = [
        {
            id: 1,
            language: "python",
            wpm: 102,
            accuracy: 97.1,
            date: "2026-04-11",
        },
        {
            id: 2,
            language: "javascript",
            wpm: 88,
            accuracy: 94.8,
            date: "2026-04-10",
        },
        {
            id: 3,
            language: "java",
            wpm: 79,
            accuracy: 98.2,
            date: "2026-04-10",
        },
        {
            id: 4,
            language: "python",
            wpm: 95,
            accuracy: 95.5,
            date: "2026-04-09",
        },
        {
            id: 5,
            language: "javascript",
            wpm: 83,
            accuracy: 93.1,
            date: "2026-04-08",
        },
    ];

    return (
        <main className="flex flex-col flex-1 items-center gap-8 px-4 sm:px-6 md:px-8 py-8 w-full max-w-360 mx-auto">
            {/* profile header */}
            <section className="flex flex-col items-center gap-3 w-full pt-8">
                {/* {profile?.avatar_url ? (
                    <img
                        src={profile.avatar_url}
                        className="w-16 h-16 rounded-full"
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-muted ...">
                        {user.email?.[0]?.toUpperCase() ?? "?"}
                    </div>
                )} */}
                <div className="flex flex-col items-center gap-1">
                    <h1 className="text-xl text-foreground">
                        {profile?.username ?? user.email}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        member since{" "}
                        {new Date(user.created_at).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                </div>
            </section>

            {/* stats grid */}
            <section className="w-full max-w-2xl">
                <h2 className="text-sm text-muted-foreground mb-3">stats</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="flex flex-col gap-1 border border-border rounded-lg p-4">
                        <span className="text-2xl text-foreground">
                            {stats?.tests_completed ?? "—"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            tests completed
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 border border-border rounded-lg p-4">
                        <span className="text-2xl text-foreground">
                            {stats?.avg_wpm ?? "—"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            avg wpm
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 border border-border rounded-lg p-4">
                        <span className="text-2xl text-foreground">
                            {stats?.best_wpm ?? "—"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            best wpm
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 border border-border rounded-lg p-4">
                        <span className="text-2xl text-foreground">
                            {stats?.avg_accuracy != null ? `${stats.avg_accuracy}%` : "—"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            avg accuracy
                        </span>
                    </div>
                </div>
            </section>

            {/* recent results */}
            <section className="w-full max-w-2xl">
                <h2 className="text-sm text-muted-foreground mb-3">
                    recent results
                </h2>
                <div className="flex flex-col border border-border rounded-lg overflow-hidden">
                    {recentResults.map((result, i) => (
                        <div
                            key={result.id}
                            className={`flex items-center justify-between px-4 py-3 text-sm ${i < recentResults.length - 1 ? "border-b border-border" : ""}`}
                        >
                            <span className="text-muted-foreground w-24">
                                {result.language}
                            </span>
                            <span className="text-foreground">
                                {result.wpm} wpm
                            </span>
                            <span className="text-muted-foreground">
                                {result.accuracy}%
                            </span>
                            <span className="text-muted-foreground text-xs">
                                {result.date}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

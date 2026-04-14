"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleOriginalIcon, GithubOriginalIcon } from "@devicon/react";
import { signInWithGithub, signInWithGoogle, signUpWithEmail } from "@/lib/supabase/auth";

export default function CreateAccountPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: { preventDefault: () => void }) {
        e.preventDefault();
        setError(null);

        if (!username || !email || !password) {
            setError("please fill in all fields");
            return;
        }
        if (password.length < 8) {
            setError("password must be at least 8 characters");
            return;
        }

        setLoading(true);
        const { error } = await signUpWithEmail({ email, password });
        setLoading(false);

        if (error) {
            setError(error.message.toLowerCase());
        } else {
            router.push("/account");
        }
    }

    return (
        <main className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-sm flex flex-col gap-8">

                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-vscode-blue">create account</h1>
                    <p className="text-muted-foreground text-sm">
                        start tracking your progress and compete on leaderboards
                    </p>
                </div>

                {/* oauth buttons */}
                <div className="flex flex-col gap-3">
                    <button onClick={signInWithGoogle} className="flex items-center justify-center gap-3 px-4 py-3 bg-card rounded-lg hover:bg-muted transition-colors text-foreground font-medium cursor-pointer">
                        <GoogleOriginalIcon className="w-5 h-5" />
                        continue with google
                    </button>
                    <button onClick={signInWithGithub} className="flex items-center justify-center gap-3 px-4 py-3 bg-card rounded-lg hover:bg-muted transition-colors text-foreground font-medium cursor-pointer">
                        <GithubOriginalIcon color="white" className="w-5 h-5" />
                        continue with github
                    </button>
                </div>

                {/* divider */}
                <div className="flex items-center gap-4">
                    <div className="flex-1 h-1 bg-border rounded" />
                    <span className="text-md text-foreground">or</span>
                    <div className="flex-1 h-1 bg-border rounded" />
                </div>

                {/* form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-muted-foreground">username</label>
                        <input
                            type="text"
                            placeholder="codertype_user"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-card rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none text-sm"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-muted-foreground">email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-card rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none text-sm"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-muted-foreground">password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-card rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none text-sm"
                        />
                    </div>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-1 px-4 py-3 bg-foreground rounded-lg hover:bg-white transition-colors text-muted-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {loading ? "creating account..." : "create account"}
                    </button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    already have an account?{" "}
                    <Link href="/signin" className="text-foreground hover:text-vscode-blue transition-colors">
                        sign in
                    </Link>
                </p>
            </div>
        </main>
    );
}

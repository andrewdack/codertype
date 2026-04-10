"use client"
import { GoogleOriginalIcon, GithubOriginalIcon } from "@devicon/react";
import Link from "next/link";
import { signInWithGithub, signInWithGoogle } from "@/lib/supabase/auth";

export default function SigninPage() {
    return (
        <main className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-sm flex flex-col gap-8">

                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-vscode-blue">sign in</h1>
                    <p className="text-muted-foreground text-sm">
                        track your progress and compete on leaderboards
                    </p>
                </div>

                {/* oauth buttons */}
                <div className="flex flex-col gap-3">
                    <button onClick={signInWithGoogle } className="flex items-center justify-center gap-3 px-4 py-3 bg-card rounded-lg hover:bg-muted transition-colors text-foreground font-medium cursor-pointer">
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
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-muted-foreground">email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="bg-card rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none text-sm"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-muted-foreground">password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="bg-card rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none text-sm"
                        />
                    </div>
                    <button className="mt-1 px-4 py-3 bg-foreground rounded-lg hover:bg-white transition-colors text-muted-foreground font-semibold">
                        sign in
                    </button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    don&apos;t have an account?{" "}
                    <Link href="/createaccount" className="text-foreground hover:text-vscode-blue transition-colors">
                        create one
                    </Link>
                </p>
            </div>
        </main>
    );
}
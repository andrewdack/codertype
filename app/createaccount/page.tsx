import Link from "next/link";
import { GoogleOriginalIcon, GithubOriginalIcon } from "@devicon/react";

export default function CreateAccountPage() {
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
                    <button className="flex items-center justify-center gap-3 px-4 py-3 bg-card rounded-lg hover:bg-muted transition-colors text-foreground font-medium">
                        <GoogleOriginalIcon className="w-5 h-5" />
                        continue with google
                    </button>
                    <button className="flex items-center justify-center gap-3 px-4 py-3 bg-card rounded-lg hover:bg-muted transition-colors text-foreground font-medium">
                        <GithubOriginalIcon color="white" className="w-5 h-5" />
                        continue with github
                    </button>
                </div>

                {/* divider */}
                <div className="flex items-center gap-4">
                    <div className="flex-1 h-[4px] bg-border rounded" />
                    <span className="text-md text-foreground">or</span>
                    <div className="flex-1 h-[4px] bg-border rounded" />
                </div>

                {/* form */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-muted-foreground">username</label>
                        <input
                            type="text"
                            placeholder="codertype_user"
                            autoComplete="username"
                            className="bg-card rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none text-sm"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-muted-foreground">email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            className="bg-card rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none text-sm"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-muted-foreground">password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            className="bg-card rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none text-sm"
                        />
                    </div>
                    <button className="mt-1 px-4 py-3 bg-foreground rounded-lg hover:bg-white transition-colors text-muted-foreground font-semibold">
                        create account
                    </button>
                </div>

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

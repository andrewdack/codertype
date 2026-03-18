"use client";

import { Github, Mail } from "lucide-react";

export default function LoginPage() {
    return (
        <main className="flex-1 flex items-center justify-center p-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground">
                        Sign in to track your progress and compete on
                        leaderboards
                    </p>
                </div>

                <div className="border border-border rounded-lg p-8">
                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors">
                            <Github className="w-5 h-5" />
                            <span>Continue with GitHub</span>
                        </button>

                        <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors">
                            <Mail className="w-5 h-5" />
                            <span>Continue with Email</span>
                        </button>
                    </div>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        <p>
                            By signing in, you agree to our Terms of Service and
                            Privacy Policy
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    <p>
                        Don't have an account?{" "}
                        <a href="#" className="text-foreground hover:underline">
                            Create one
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}

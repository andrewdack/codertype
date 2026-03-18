import Link from "next/link";
import { Terminal, Code2, Info, Settings, User } from "lucide-react";

export default function Navbar({ className }: { className?: string }) {
    return (
        <nav className="border-b border-border w-full">
            <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                {/* Left side */}
                <div className="flex items-center gap-6">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Terminal className="w-5 h-5" />
                        <span className="font-semibold text-sm">codertype.xyz</span>
                    </Link>

                    {/* Navigation links */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/code-library"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="Code Library"
                        >
                            <Code2 className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/about"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="About"
                        >
                            <Info className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/settings"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="Settings"
                        >
                            <Settings className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Right side */}
                <Link
                    href="/login"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    title="Login"
                >
                    <User className="w-5 h-5" />
                </Link>
            </div>
        </nav>
    );
}

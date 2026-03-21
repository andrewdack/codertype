import Link from "next/link";
import { Terminal, Code2, Info, Settings, User, Trophy, TrophyIcon } from "lucide-react";

export default function Navbar({ className }: { className?: string }) {
    return (
        <nav className="border-border w-full ">
            <div className="max-w-360 mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
                {/* Left side */}
                <div className="flex items-center gap-4 sm:gap-8">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Terminal className="w-6 h-6 sm:w-10 sm:h-10" />
                        <span className="font-extrabold sm:text-xl">codertype</span>
                    </Link>

                    {/* Navigation links */}
                    <div className="flex items-center gap-3 sm:gap-6">
                        <Link
                            href="/code-library"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="Code Library"
                        >
                            <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />
                        </Link>
                        <Link
                            href="/about"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="About"
                        >
                            <Info className="w-6 h-6 sm:w-8 sm:h-8" />
                        </Link>
                        <Link
                            href="/settings"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            title="Settings"
                        >
                            <Settings className="w-6 h-6 sm:w-8 sm:h-8" />
                        </Link>
                    </div>
                </div>

                {/* Right side */}
                <Link
                    href="/login"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    title="Login"
                >
                    <User className="w-6 h-6 sm:w-8 sm:h-8" />
                </Link>
            </div>
        </nav>
    );
}

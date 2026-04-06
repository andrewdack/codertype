import Link from "next/link";
import { SquareTerminal } from "lucide-react";
import { Trophy, Info, Gear, User } from "@phosphor-icons/react/dist/ssr";

export default function Navbar({ className }: { className?: string }) {
    return (
        <nav className="border-border w-full ">
            <div className="max-w-360 mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
                {/* Left side */}
                <div className="flex items-center gap-4 sm:gap-8">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2"
                    >
                        <SquareTerminal className="w-10 h-8 sm:w-12 sm:h-12 text-vscode-blue" />
                        <span className="font-extrabold text-xl sm:text-3xl text-foreground">codertype</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

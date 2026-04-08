"use client";

import Link from "next/link";
import { SquareTerminal } from "lucide-react";
import UserIcon from "./icons/UserIcon";
import SettingsIcon from "./icons/SettingsIcon";
import TrophyIcon from "./icons/TrophyIcon";
import LeaderboardRoundedIcon from "./icons/LeaderboardIcon";

export default function Navbar({ className }: { className?: string }) {
    return (
        <nav className="border-border w-full ">
            <div className="max-w-360 mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
                {/* Left side */}
                <div className="flex items-center gap-4 sm:gap-8">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <SquareTerminal className="w-10 h-8 sm:w-12 sm:h-12 text-vscode-blue" />
                        <span className="font-extrabold text-xl sm:text-3xl text-foreground">
                            codertype
                        </span>
                    </Link>
                </div>
                <div className="flex items-center gap-4 sm:gap-8 ">
                    <Link href="/settings" className="cursor-pointer">
                        <LeaderboardRoundedIcon className="size-6 transition-colors text-muted-foreground hover:text-foreground " />
                    </Link>
                    <Link href="/settings" className="cursor-pointer">
                        <SettingsIcon className="size-6 transition-colors text-muted-foreground hover:text-foreground" />
                    </Link>
                    <Link href="/signin" className="cursor-pointer">
                        <UserIcon className="size-6 transition-colors text-muted-foreground hover:text-foreground" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}

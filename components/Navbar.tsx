"use client";

import { SquareTerminal } from "lucide-react";

export default function Navbar({ className }: { className?: string }) {
    function handleLogoClick() {
        window.dispatchEvent(new CustomEvent("codertype:restart"));
    }

    return (
        <nav className="border-border w-full ">
            <div className="max-w-360 mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
                {/* Left side */}
                <div className="flex items-center gap-4 sm:gap-8">
                    {/* Logo */}
                    <button onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer">
                        <SquareTerminal className="w-10 h-8 sm:w-12 sm:h-12 text-vscode-blue" />
                        <span className="font-extrabold text-xl sm:text-3xl text-foreground">codertype</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

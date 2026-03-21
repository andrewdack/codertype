import Link from "next/link";
import { Mail, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full">
            <div className="max-w-360 mx-auto px-4 sm:px-6 h-8 sm:h-10 flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-3 sm:gap-6 text-muted-foreground">
                    <Link href="mailto:dackcodes@gmail.com" className="hover:text-foreground transition-colors flex items-center gap-1">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Contact</span>
                    </Link>
                    <Link href="https://github.com/andrewdack/codertype" className="hover:text-foreground transition-colors flex items-center gap-1" target="_blank">
                        <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">GitHub</span>
                    </Link>
                </div>

                <div className="flex items-center gap-3 sm:gap-6 text-muted-foreground">
                    <Link href="/terms" className="hover:text-foreground transition-colors">
                        Terms
                    </Link>
                    <Link href="/security" className="hover:text-foreground transition-colors">
                        Security
                    </Link>
                    <Link href="/privacy" className="hover:text-foreground transition-colors">
                        Privacy
                    </Link>
                </div>
            </div>
        </footer>
    );
}
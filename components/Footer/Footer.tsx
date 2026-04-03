import Link from "next/link";
import { Envelope, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import ThemeSelector, { Theme } from "./ThemeSelector";

interface FooterProps {
    selectedThemeName: string;
    onSelectTheme: (name: string, style: Theme) => void;
}

export default function Footer({ selectedThemeName, onSelectTheme }: FooterProps) {
    return (
        <footer className="w-full">
            <div className="max-w-360 mx-auto px-4 sm:px-6 h-8 sm:h-10 flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-3 sm:gap-6 text-muted-foreground">
                    <Link
                        href="mailto:dackcodes@gmail.com"
                        className="inline-flex items-center gap-1 leading-none hover:text-foreground transition-colors"
                    >
                        <Envelope weight="thin" className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">contact</span>
                    </Link>
                    <Link
                        href="https://github.com/andrewdack/codertype"
                        className="inline-flex items-center gap-1 leading-none hover:text-foreground transition-colors"
                        target="_blank"
                    >
                        <GithubLogo weight="thin" className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">gitHub</span>
                    </Link>
                </div>

                <div className="flex items-center gap-3 sm:gap-6 text-muted-foreground">
                    <ThemeSelector
                        selectedThemeName={selectedThemeName}
                        onSelectTheme={onSelectTheme}
                    />
                </div>
            </div>
        </footer>
    );
}

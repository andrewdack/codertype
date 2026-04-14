export default function SettingsPage() {
    return (
        <main className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-sm flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-vscode-blue">settings</h1>
                    <p className="text-muted-foreground text-sm">
                        customize your typing experience
                    </p>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="bg-card rounded-lg px-4 py-3 text-muted-foreground text-sm">
                        coming soon
                    </div>
                </div>
            </div>
        </main>
    );
}

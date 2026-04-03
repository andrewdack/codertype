// component to select settings for time, difficult, etc

export type testingType = "time" | "length" | "difficulty";
export type difficultyLevel = "easy" | "medium" | "hard";
export type timeOption = 15 | 30 | 60 | 120;
export type lengthOption = "short" | "medium" | "long";

interface TypingSettingsSelectorProps {
    testingType: testingType;
    difficultyLevel?: difficultyLevel;
    timeOption?: timeOption;
    lengthOption?: lengthOption;
    onTestingTypeChange: (type: testingType) => void;
}

export default function TypingSettingsSelector({
    testingType,
    difficultyLevel,
    timeOption,
    lengthOption,
    onTestingTypeChange,
}: TypingSettingsSelectorProps) {
    return (
        <div className="p-4 rounded-md bg-card">
            <h2 className="text-lg text-muted-foreground font-semibold">
                Settings Selector
            </h2>
        </div>
    );
}

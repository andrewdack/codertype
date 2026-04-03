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
        <div className="flex bg-card w-full">
            <div>
                {/* select the test types*/}
                <button>time</button>
                <button>length</button>
                <button>difficulty</button>
            </div>

            <div>
                
            </div>
        </div>
    );
}

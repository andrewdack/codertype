// calculation for the stats shown at the end of the test
export function countErrors(actual: string, expected: string) {
    const expectedChars = expected.split("");

    return expectedChars.reduce((errors, expectedChar, i) => {
        const actualChar = actual[i];

        // skip counting tabs into the error count
        if (expectedChar === '\t') {
            return errors;
        }

        if (actualChar !== expectedChar) {
            return errors + 1;
        }
        return errors;
    }, 0);
}

export function calculateAccuracyPercentage(errors: number, total: number) {
    if (total > 0) {
        const correct = total - errors;
        const accuracy = (correct / total) * 100
        return accuracy;
    }
    return 0;
}

export function calculateRawWPM(typed: string, milliseconds: number) {
    const minutes = milliseconds / (60 * 10000);

    // number of words in a character by default
    const wordLengthConstant = 5;
    let wpm = 0
    if (minutes > 0) {
        wpm = (typed.length / wordLengthConstant) / minutes;
    }
    return wpm;
}

export function calculateAdjustedWPM(rawwpm: number, accuracyPercent: number) {
    const adjusted = rawwpm * (accuracyPercent / 100);
    return adjusted;
}
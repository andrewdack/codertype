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
        const accuracy = (correct / total) * 100; 
        return accuracy;
    }
    return 0;
}

const fs = require(`fs`);

const file = fs.readFileSync(`file.txt`, { encoding: `utf-8` })
    .split(`\n`)
    .map((line) => {
        const [signalPatterns, outputValue] = line
            .split(" | ")
            .map((x) => x.split(" ").map((string) => {
                const letters = [...string];
                letters.sort();
                return letters.join('')
            }));
        return {
            signalPatterns,
            outputValue
        };
    });

const countEasyOccurences = () => {
    let counter = 0;
    for (const line of file) {
        const matches = line.outputValue.filter((v) => [2, 3, 4, 7].includes(v.length));
        counter += matches.length;
    }
    return counter;
}

//a includes all of b
function includes(a, b) {
    const set = new Set([...a]);
    return [...b].every((x) => set.has(x));
}

const countHardOccurences = () => {
    let sum = 0;

    for (const line of file) {
        const matches = {
            1: line.signalPatterns.find((x) => x.length == 2),
            4: line.signalPatterns.find((x) => x.length == 4),
            7: line.signalPatterns.find((x) => x.length == 3),
            8: line.signalPatterns.find((x) => x.length == 7)
        }
        matches[6] = line.signalPatterns.find(
            (x) => x.length == 6 && !includes(x, matches[1])
        );
        matches[9] = line.signalPatterns.find(
            (x) =>
                x.length == 6
                && x != matches[6]
                && includes(x, matches[4])
        );
        matches[0] = line.signalPatterns.find(
            (x) =>
                x.length == 6
                && x != matches[6]
                && x != matches[9]
        );
        matches[3] = line.signalPatterns.find(
            (x) => x.length == 5 && includes(x, matches[1])
        );
        matches[5] = line.signalPatterns.find(
            (x) =>
                x.length == 5
                && x != matches[3]
                && includes(matches[6], x)
        );
        matches[2] = line.signalPatterns.find(
            (x) =>
                x.length == 5
                && x != matches[3]
                && x != matches[5]
        );

        const translationTable = Object.fromEntries(
            Object.entries(matches).map((x) => x.reverse())
        );

        const translated = Number(
            line.outputValue.map((signal) => translationTable[signal]).join('')
        );

        sum += translated;
    }
    return sum;
}
// number => number of segments
// 0 => 6 @
// 1 => 2 #
// 2 => 5
// 3 => 5
// 4 => 4 # 
// 5 => 5
// 6 => 6@
// 7 => 3 #
// 8 => 7 #
// 9 => 6@
console.log('Task_1:', countEasyOccurences());
console.log('Task_2:', countHardOccurences());
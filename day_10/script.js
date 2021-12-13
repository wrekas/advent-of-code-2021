const fs = require(`fs`);

const file = fs.readFileSync(`file.txt`, { encoding: `utf-8` }).split(`\n`);

function median(array) {
	const internalArray = [...array];
	internalArray.sort((a, b) => a - b);
	if (internalArray.length % 2 === 0) {
		return (
			(internalArray[internalArray.length / 2 - 1]
				+ internalArray[internalArray.length / 2]) / 2
		);
	} else {
		return internalArray[Math.floor(internalArray.length / 2)];
	}
}


function part1() {
	const closingChar = {
		"(": ")",
		"{": "}",
		"[": "]",
		"<": ">"
	};

	const point = {
		")": 3,
		"]": 57,
		"}": 1197,
		">": 25137
	};

	const found = {
		")": 0,
		"}": 0,
		"]": 0,
		">": 0
	};

	for (const line of file) {
		const stack = [];
		for (let i = 0; i < line.length; i++) {
			const element = line[i];
			if (/[({\[<]/.test(element)) {
				stack.push(closingChar[element]);
			} else {
				const expected = stack.pop();
				if (expected != element) {
					found[element]++;
				}
			}
		}
	}
	const score = Object.keys(found)
		.map((key) => point[key] * found[key])
		.reduce((a, b) => a + b, 0);
	return score;
}

function part2() {
	const closingChar = {
		"(": ")",
		"{": "}",
		"[": "]",
		"<": ">",
	};
	const points = {
		")": 1,
		"]": 2,
		"}": 3,
		">": 4,
	};
	const scores = [];

	for (const line of file) {
		const stack = [];
		let corrupted = false;
		for (let i = 0; i < line.length; i++) {
			const element = line[i];
			if (/[({\[<]/.test(element)) {
				stack.push(closingChar[element]);
			} else {
				const expected = stack.pop();
				if (expected !== element) {
					corrupted = true;
					break;
				}
			}
		}
		if (!corrupted && stack.length > 0) {
			const closingChars = stack.reverse().join("");
			let score = 0;
			for (let i = 0; i < closingChars.length; i++) {
				const element = closingChars[i];
				score *= 5;
				score += points[element];
			}
			scores.push(score);
		}
	}
	return median(scores);
}

console.log('Task 1 result:', part1());
console.log('Task 2 result:', part2());
const fs = require(`fs`);

const lines = fs
	.readFileSync(`file.txt`, { encoding: `utf-8` })
	.split(`,`)
	.map((x) => +x)
	.sort((a, b) => a - b);

const getFuelNeededToGetToPositionEasy = (from, to) => {
	return Math.abs(from - to);
};

const getFuelNeededToGetToPositionHard = (from, to) => {
	let distance = Math.abs(from - to);
	let fuelNeeded = 0;
	for (let i = 0; i <= distance; i++) {
		fuelNeeded += i;
	}
	return fuelNeeded;
};

const calculatePostionSumOfFuel = (destination, postions = [], calculationMethod) => {
	let sumOfFuel = 0;
	postions.forEach((x) => {
		sumOfFuel += calculationMethod(x, destination);
	});
	return sumOfFuel;
};

const calculateLeastAmountOfFuel = (positions = [], calculationMethod) => {
	let n = positions[positions.length - 1];
	let leastAmountOfFuel = Infinity;
	for (let i = 0; i <= n; i++) {
		let x = calculatePostionSumOfFuel(i, positions, calculationMethod);
		if (x < leastAmountOfFuel) leastAmountOfFuel = x;
	}
	return leastAmountOfFuel;
};

console.log('Least amount of fuel needed to kaboom in EASY mode: ', calculateLeastAmountOfFuel(lines, getFuelNeededToGetToPositionEasy));
console.log('Least amount of fuel needed to kaboom in HARD mode: ', calculateLeastAmountOfFuel(lines, getFuelNeededToGetToPositionHard));

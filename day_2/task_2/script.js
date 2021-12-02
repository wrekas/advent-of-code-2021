const fs = require(`fs`);

const lines = fs.readFileSync(`file.txt`, { encoding: `utf-8` }).split(`\n`);

let depth = 0,
  position = 0,
  aim = 0;

lines.forEach((x) => {
  const digit = parseInt(x.match(/(\d+)/g));
  if (x.startsWith(`forward`)) {
    position += digit;
    depth += aim * digit;
  } else if (x.startsWith(`down`)) aim += digit;
  else aim -= digit;
});

console.log(depth);
console.log(position);
console.log(aim);
console.log(position * depth);

const fs = require(`fs`);

const lines = fs.readFileSync(`file.txt`, {encoding: `utf-8`}).split(`\n`);

console.log(lines.filter((x, index) => parseInt(x)>parseInt(lines[index-1])).length)

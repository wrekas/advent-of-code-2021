const fs = require(`fs`);

const lines = fs.readFileSync(`file.txt`, {encoding: `utf-8`}).split(`\n`).filter(x => x);

lines.forEach(x => console.log(x))
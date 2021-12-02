const fs = require(`fs`);

const lines = fs.readFileSync(`file.txt`, { encoding: `utf-8` }).split(`\n`);

let height = 0;
let position = 0;

lines.forEach((x) => {
  if (x.startsWith(`forward`)) position += parseInt(x.match(/(\d+)/g));
  else if (x.startsWith(`down`)) height += parseInt(x.match(/(\d+)/g));
  else height -= parseInt(x.match(/(\d+)/g));
});

console.log(position);
console.log(height);
console.log(position * height);

const fs = require(`fs`);

const lines = fs.readFileSync(`file.txt`, {encoding: `utf-8`}).split(`\n`);

let increases = 0;

for(let i=1; i<lines.length;i++){
    const thisIteration = parseInt(lines[i]) + parseInt(lines[i+1]) + parseInt(lines[i+2]);
    const previousIteration = parseInt(lines[i-1]) + parseInt(lines[i]) + parseInt(lines[i+1]);

    if(thisIteration > previousIteration) increases++
}

console.log(increases);

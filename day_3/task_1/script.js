const fs = require(`fs`);

const lines = fs.readFileSync(`file.txt`, {encoding: `utf-8`}).split(`\n`);

function findValueAtPos(array=[], pos = 0, {binary}){
    let zeros = 0;
    let ones = 0;
    array.forEach(x => {
        if (x[pos]==0) zeros++
        else ones ++ 
    })
    if (binary=="gamma") return zeros>ones?0:1
    else return zeros>ones?1:0
}

let gamma = ""
let epsilon = ""

for(let i = 0; i<lines[0].length; i++){
    gamma += findValueAtPos(lines, i, {binary: "gamma"})
    epsilon += findValueAtPos(lines, i, {binary: "epsilon"})
}

console.log(`Power consumption: ${parseInt(gamma, 2)*parseInt(epsilon, 2)}`)

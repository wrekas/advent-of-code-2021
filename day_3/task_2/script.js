const fs = require(`fs`);

const lines = fs.readFileSync(`file.txt`, { encoding: `utf-8` }).split(`\n`);

function findValueAtPos(array = [], pos = 0, { rating }) {
  let zeros = 0;
  let ones = 0;
  array.forEach((x) => {
    if (x[pos] == 0) zeros++;
    else ones++;
  });
  if (rating == "oxygen") return ones >= zeros ? 1 : 0;
  else return zeros <= ones ? 0 : 1;
}

let oxygenArray = lines;
let scrubberArray = lines;

const calculateOxygen = ( () => {
  for (let i = 0; i < lines[0].length; i++) {
    if(oxygenArray.length==1) break;
    let valueAtPos = "";
    valueAtPos += findValueAtPos(oxygenArray, i, { rating: "oxygen" });
    oxygenArray = oxygenArray.filter((x) => x[i] === valueAtPos);
  }
})
const calculateScrubber = ( () => {
    for (let i = 0; i < lines[0].length; i++) {
      if(scrubberArray.length==1) break;
      let valueAtPos = "";
      valueAtPos += findValueAtPos(scrubberArray, i, { rating: "scrubber" });
      scrubberArray = scrubberArray.filter((x) => x[i] === valueAtPos);
    }
  })

calculateOxygen();
calculateScrubber();
console.log(`Oxygen array: ${oxygenArray}, oxygen rate: ${parseInt(oxygenArray[0],2)}`)
console.log(`Oxygen array: ${scrubberArray}, oxygen rate: ${parseInt(scrubberArray[0],2)}`)
console.log(`Life support rating ${parseInt(oxygenArray[0],2)*parseInt(scrubberArray[0],2)}`)



// console.log(oxygenArray);
// let gamma = ""
// let epsilon = ""

// for(let i = 0; i<lines[0].length; i++){
//     gamma += findValueAtPos(lines, i, {binary: "gamma"})
//     epsilon += findValueAtPos(lines, i, {binary: "epsilon"})
// }

// console.log(`Power consumption: ${parseInt(gamma, 2)*parseInt(epsilon, 2)}`)

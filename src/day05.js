import {fetchInputData} from "./libraries.js";

const year = 2017
const day = 5;

let file = "";

const isBrowser = () => typeof window !== `undefined`
const isNode = !isBrowser()

if (isNode) {
    file = fetchInputData(year, day);
} else {
    const sync_fetch = require('sync-fetch')
    file = sync_fetch(`data/day_${day}.txt`).text();
}

///////////////////////////////////////////////////
// START HERE
///////////////////////////////////////////////////

let input = file.trim().split("\n").map(f => parseInt(f))

let index=0
let jumps=0
while (index >= 0 && index < input.length) {
    jumps++
    let c = index + input[index]
    input[index] += 1
    index = c
}
console.log("Part 1 "+jumps)

input = file.trim().split("\n").map(f => parseInt(f))

index=0
jumps=0
while (index >= 0 && index < input.length) {
    jumps++
    let c = index + input[index]
    if(input[index] >= 3)
        input[index] -= 1
    else
        input[index] += 1
    index = c
}
console.log("Part 2 "+jumps)
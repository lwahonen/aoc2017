import {fetchInputData} from "./libraries.js";

const year = 2017
const day = 6;

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

let input = file.trim().split("\t").map(f => parseInt(f))
// input=[0,2,7,0]
let seens={}

let rounds=0
while (true) {
    let key = input.join(",")
    // console.log("After round "+rounds+" the situation is "+key)
    if (seens.hasOwnProperty(key)) {
        console.log("Part 1 "+rounds+" Part 2 "+(rounds-seens[key]))
        break
    }
    seens[key] = rounds
    rounds++;
    let largestBank = Math.max(...input);
    let targetIndex = input.indexOf(largestBank)
    input[targetIndex]=0;
    for (let i = 0; i < largestBank; i++) {
        targetIndex += 1
        targetIndex %= input.length
        input[targetIndex] += 1
    }
}

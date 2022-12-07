import {fetchInputData} from "./libraries.js";

const year = 2017
const day = 1;

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
let input=file.trim().split("").map(f=>parseInt(f));

let total=0;
for (let i = 0; i < input.length; i++) {
    let index=i+1;
    index = index % input.length
    if (input[i] === input[index])
        total += input[i];
}

console.log(`Part 1 ${total}`)
total=0
for (let i = 0; i < input.length; i++) {
    let index=i+(input.length / 2);
    index = index % input.length
    if (input[i] === input[index])
        total += input[i];
}
console.log(`Part 2 ${total}`)


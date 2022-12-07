import {fetchInputData, keyCount} from "./libraries.js";

const year = 2017
const day = 9;

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

let input = file.trim()
// input="{{{},{},{{}}}}"
// console.log(input)
input=input.replaceAll(/!./g, "")
// console.log(input)
let garbiage=[...input.matchAll(/<[^>]*>/g)]
let part2 = 0;
for (let g of garbiage) {
    part2+=g[0].length -2
}
console.log(part2)
input = input.replaceAll(/<[^>]*>/g, "")
// console.log(input)
input=input.replaceAll(/,/g, "")
// console.log(input)

let level=0;
let score=0
for (let i = 0; i < input.length; i++) {
    let c = input.charAt(i)
    if (c == "{")
        level++;
    if (c == "}") {
        score += level
        level--
    }
}
console.log(score)
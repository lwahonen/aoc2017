import {fetchInputData, keyCount} from "./libraries.js";

const year = 2017
const day = 15;

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

let input=file.trim().split("\n").map(a=>parseInt(a.split(" with ")[1]))

let a = input[0]
let b = input[1]
let part1 = 0
for (let i = 0; i < 40000000; i++) {
    a *= 16807
    a %= 2147483647
    b *= 48271
    b %= 2147483647
    // console.log("a " + a + " b " + b)
    if ((a & 0xFFFF) == (b & 0xFFFF)) {
        part1++;
    }
}
console.log("Part 1 "+part1)

let part2 = 0
a = input[0]
b = input[1]
for (let i = 0; i < 5000000; i++) {
    do {
        a *= 16807
        a %= 2147483647
    } while ((a % 4) != 0);
    do {
        b *= 48271
        b %= 2147483647
    } while ((b % 8) != 0)
    // console.log("a " + a + " b " + b)
    if ((a & 0xFFFF) == (b & 0xFFFF)) {
        part2++;
    }
}
console.log("Part 2 "+part2)

import {fetchInputData, keyCount} from "./libraries.js";

const year = 2017
const day = 10;

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

let input = file.trim().split(",").map(d=>parseInt(d))
// input=[3, 4, 1, 5]

let list=[]
for (let i = 0; i < 256; i++) {
    list.push(i)
}

let current=0
let skip=0

function runRound(i) {
    let length = input[i];
    if (length > 1) {
        if (current + length < list.length) {
            let head = list.slice(0, current)
            let slice = list.slice(current, current + length);
            let rev = slice.reverse()
            let tail = list.slice(current + length)
            list = head.concat(rev).concat(tail)
        } else {
            let tail = list.slice(current);
            let head = list.slice(0, length - tail.length);
            let fullslice = tail.concat(head)
            let rev = fullslice.reverse()
            let unchanged = list.slice(head.length, current)
            let tailSlice = rev.slice(0, tail.length);
            let headSlice = rev.slice(rev.length - head.length);
            list = headSlice.concat(unchanged).concat(tailSlice)
        }
    }
    current += length;
    current += skip;
    skip++;
    current %= list.length
}

for (let i = 0; i < input.length; i++) {
    runRound(i);
}
console.log("Part 1 "+(list[0]*list[1]))

// Prep input for part 2
input=file.trim().split('').map(char => char.charCodeAt(0)).concat([17, 31, 73, 47, 23])

// Reset all
list=[]
current=0
skip=0
for (let i = 0; i < 256; i++) {
    list.push(i)
}

// Get hash
for (let j = 0; j < 64; j++) {
    for (let i = 0; i < input.length; i++) {
        runRound(i);
    }
}

let part2=""
for (let i = 0; i < 16; i++) {
    let slice = list.slice(i * 16, (i + 1) * 16)
    part2 += getChar(slice)
}
console.log("Part 2 "+part2)

function getChar(arr) {
    const xorred = arr.reduce(
        (accumulator, currentValue) => accumulator ^ currentValue,
        0
    );
    return xorred.toString(16).padStart(2, '0')
}

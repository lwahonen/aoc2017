import {fetchInputData} from "./libraries.js";

const year = 2017
const day = 4;

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
let input = file.trim().split("\n").map(f => f.split(" "))

function part1(ar) {
    let s = []
    for (let pass of ar) {
        if (s.hasOwnProperty(pass)) {
            return false;
        }
        s[pass] = pass
    }
    return true
}

function part2(ar) {
    let s = []
    for (let pass of ar) {
        let pr = [...pass].sort().join("")
        if (s.hasOwnProperty(pr)) {
            return false;
        }
        s[pr] = pr
    }
    return true
}

let p1 = 0
let p2 = 0
for (let row of input) {
    if (part1(row)) {
        p1++;
        if (part2(row)) {
            p2++
        }
    }
}
console.log("Part 1 " + p1 + " Part 2 " + p2)
import {fetchInputData, keyCount} from "./libraries.js";

const year = 2017
const day = 11;

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

let input = file.trim().split(",")

let q=0
let r=0

let max=0

for(let step of input) {
    if (step == "nw") {
        q -= 1
    }
    if (step == "n") {
        r -= 1
    }
    if (step == "ne") {
        q += 1
        r -= 1
    }
    if (step == "sw") {
        q -= 1
        r += 1
    }
    if (step == "s") {
        r += 1
    }
    if (step == "se") {
        q += 1
    }
    let origo = {q: 0, r: 0};
    max = Math.max(max, axial_distance(origo, {q, r}))
}

let origo = {q:0,r:0};
console.log(axial_distance(origo, {q,r}))
console.log(max)

function axial_distance(a, b) {
    return (Math.abs(a.q - b.q)
        + Math.abs(a.q + a.r - b.q - b.r)
        + Math.abs(a.r - b.r)) / 2
}
import {fetchInputData, keyCount} from "./libraries.js";

const year = 2017
const day = 13;

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
//
// file=
//     `
// 0: 3
// 1: 2
// 4: 4
// 6: 4
//     `
let input = file.trim().split("\n").map(f => {
    let pair = f.split(": ")
    return {delay: parseInt(pair[0]), cycle: parseInt(pair[1])}
})


function catches(level, time) {
    let cyclelen = (level-1) * 2
    if (time % cyclelen == 0) {
        return true
    }
    return false
}


let score=0
for(let row of input) {
    let b = catches(row.cycle, row.delay);
    if (b) {
        score += row.cycle * row.delay
    }
}
console.log("Part 1 "+score)

let latency=0
let escaped=false
while (!escaped) {
    for (let row of input) {
        escaped = true
        let b = catches(row.cycle, row.delay + latency);
        if (b) {
            // console.log("Trap " + row.delay)
            latency++
            escaped = false
            break
        }
    }
}
console.log("Part 2 "+latency)
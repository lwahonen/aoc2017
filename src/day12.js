import {fetchInputData, keyCount} from "./libraries.js";

const year = 2017
const day = 12;

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

let input = file.trim().split("\n").map(f => {
    let pair = f.split(" <-> ")
    return {from: pair[0], to: pair[1].split(", ")}
})

let nodes = {}

for (let row of input) {
    let n;
    if (nodes.hasOwnProperty(row.from)) {
        n = nodes[row.from]
    } else {
        n = {tops: [], bottoms: [], id: row.from}
        nodes[row.from] = n
    }
    n.bottoms.push(...row.to)
    for (let kid of row.to) {
        let child;
        if (nodes.hasOwnProperty(kid)) {
            child = nodes[kid]
        } else {
            child = {tops: [], bottoms: [], id: kid}
            nodes[kid] = child
        }
        child.tops.push(row.from)
    }
}

let start = nodes[0];
killAnotherGroup(start);

let groups = 1
while (keyCount(nodes) > 0) {
    start = Object.keys(nodes)[0]
    killAnotherGroup(nodes[start])
    groups++
}
console.log("Part 2 " + groups)

function killAnotherGroup(start) {
    let visitus = [start];

    let seen = {}
    while (visitus.length > 0) {
        let head = visitus.pop();
        for (let node of head.tops) {
            if (!seen.hasOwnProperty(node)) {
                visitus.push(nodes[node])
            }
        }
        for (let node of head.bottoms) {
            if (!seen.hasOwnProperty(node)) {
                visitus.push(nodes[node])
            }
        }
        seen[head.id] = head
    }
    if (start.id == 0) {
        console.log("Part 1: group " + start.id + " processed, had keys " + keyCount(seen))
    }
    for (let n in seen) {
        delete nodes[n]
    }
}


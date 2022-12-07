import {fetchInputData, keyCount} from "./libraries.js";
import isprime from 'isprime';

const year = 2017
const day = 24;

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

let input = file.trim().split("\n").map(f => f.split("/").map(g => parseInt(g)))
for (let i = 0; i < input.length; i++) {
    input[i].id = i
}

let seen_bridges = {}

function buildBridges(used, port, key, sofar) {
    if (seen_bridges.hasOwnProperty(key)) {
        return seen_bridges[key]
    }
    let available = input.filter(f => (!used.includes(f.id) && (f[0] == port || f[1] == port)))
    let kid_max = sofar;
    for (const part of available) {
        let part_power = sofar + part[0] + part[1];
        let part_key = key + "--" + part[0] + "/" + part[1];
        if (part[0] == port) {
            let nowUsed = [...used]
            nowUsed.push(part.id)
            let kid_power = buildBridges(nowUsed, part[1], part_key, part_power);
            kid_max = Math.max(kid_max, kid_power)
        } else if (part[1] == port) {
            let nowUsed = [...used]
            nowUsed.push(part.id)
            let kid_power = buildBridges(nowUsed, part[0], part_key, part_power);
            kid_max = Math.max(kid_max, kid_power)
        }
    }
    seen_bridges[key] = kid_max
    return kid_max
}

console.log("Part 1 " + buildBridges([], 0, "/", 0))
let pow = 0
let max_len = 0
for (const seen of Object.keys(seen_bridges)) {
    if (!seen.match(/\//g)) {
        console.log("asdf")
    }

    let length = seen.match(/\//g).length;
    if (length == max_len) {
        if (seen_bridges[seen] > pow) {
            pow = seen_bridges[seen]
        }
    }
    if (length > max_len) {
        max_len = length
        pow = seen_bridges[seen]
    }
}
console.log("Part 2 " + pow)
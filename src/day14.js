import {fetchInputData, keyCount} from "./libraries.js";

const year = 2017
const day = 14;

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

function runRound(i, toHash, list, current, skip) {
    let length = toHash[i];
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
    return {current: current, skip: skip, list: list}
}

function getHash(toHash) {
    toHash = toHash.concat([17, 31, 73, 47, 23])
    // Reset all
    let list = []
    for (let i = 0; i < 256; i++) {
        list.push(i)
    }

    let current = 0
    let skip = 0

    // Get hash
    for (let j = 0; j < 64; j++) {
        for (let i = 0; i < toHash.length; i++) {
            let d = runRound(i, toHash, list, current, skip);
            skip = d.skip
            current = d.current
            list = d.list
        }
    }

    let part2 = ""
    for (let i = 0; i < 16; i++) {
        let slice = list.slice(i * 16, (i + 1) * 16)
        part2 += getChar(slice)
    }
    return part2;
}

let score = 0
let map = {}

for (let i = 0; i < 128; i++) {
    let s = file.trim() + "-" + i;
    let hashMe = s.split("").map(char => char.charCodeAt(0))
    let part2 = getHash(hashMe);
    let binary = getBinary(part2);
    for (let j = 0; j < binary.length; j++) {
        let s1 = binary.charAt(j);
        map[`${i},${j}`] = parseInt(s1)
        if (s1 == "1") {
            score++
        }
    }
}
console.log(score)

let groups = 0
for (let row = 0; row < 128; row++) {
    for (let col = 0; col < 128; col++) {
        if (map[`${row},${col}`] == 1) {
            // printMap()
            groups++;
            killMapFriends(row, col);
        }
    }
}
console.log(groups)

function printMap() {
    for (let row = 0; row < 4; row++) {
        let r = ""
        for (let col = 0; col < 128; col++) {
            r += map[`${row},${col}`]
        }
        console.log(r)
    }
}

function killMapFriends(row, col) {
    let visit = [{row: row, col: col}]
    while (visit.length > 0) {
        let here = visit.pop();
        map[`${here.row},${here.col}`] = "X"
        if (here.row > 0 && map[`${here.row - 1},${here.col}`] === 1) {
            visit.push({row: here.row - 1, col: here.col})
        }
        if (here.row < 128 && map[`${here.row + 1},${here.col}`] === 1) {
            visit.push({row: here.row + 1, col: here.col})
        }
        if (here.col > 0 && map[`${here.row},${here.col - 1}`] === 1) {
            visit.push({row: here.row, col: here.col - 1})
        }
        if (here.col < 128 && map[`${here.row},${here.col + 1}`] === 1) {
            visit.push({row: here.row, col: here.col + 1})
        }
    }
}

function getBinary(s) {
    return BigInt("0x" + s).toString(2).padStart(128, 0)
}

function getChar(arr) {
    const xorred = arr.reduce((accumulator, currentValue) => accumulator ^ currentValue, 0);
    return xorred.toString(16).padStart(2, '0')
}

import {fetchInputData} from "./libraries.js";

const year = 2017
const day = 3;

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
let input = parseInt(file.trim());

// input = 1024

function squareSide(level) {
    return (2 * (level + 1)) - 1;
}

function squareSize(level) {
    return squareSide(level) * squareSide(level)
}

function startForLevel(level) {
    if (level == 0) {
        return {x: 0, y: 0, value: 0}
    }
    return {x: level, y: (-1) * (level - 1), value: (squareSize(level - 1)) + 1}
}

function topRightLevel(level) {
    if (level == 0) {
        return {x: 0, y: 0}
    }
    let forLevel = startForLevel(level);
    forLevel.y += squareSide(level) - 2
    forLevel.value += squareSide(level) - 2
    return forLevel
}

function topLeftLevel(level) {
    if (level == 0) {
        return {x: 0, y: 0}
    }
    let forLevel = topRightLevel(level);
    forLevel.x = -level
    forLevel.value += squareSide(level) - 1
    return forLevel
}

function bottomLeftLevel(level) {
    if (level == 0) {
        return {x: 0, y: 0}
    }
    let forLevel = topLeftLevel(level);
    forLevel.y = -level
    forLevel.value += squareSide(level) - 1
    return forLevel
}

function bottomRightLevel(level) {
    if (level == 0) {
        return {x: 0, y: 0}
    }
    let forLevel = bottomLeftLevel(level);
    forLevel.y = -level
    forLevel.value += squareSide(level) - 1
    return forLevel
}

function manhattan(point) {
    console.log(JSON.stringify(point))
    return Math.abs(point.x) + Math.abs(point.y)
}

function coordsFor(input) {
    let level = 0
    while (squareSize(level) < input) {
        level++
    }

    let bl = bottomLeftLevel(level);
    if (input > bl.value) {
        bl.x += (input - bl.value)
        bl.value = input
        // console.log("Target found on bottom row " + JSON.stringify(bl))
        return bl;
    }

    let tl = topLeftLevel(level);
    if (input > tl.value) {
        tl.y -= (input - tl.value)
        tl.value = input
        // console.log("Target found on left side " + JSON.stringify(tl))
        return tl;
    }

    let tr = topRightLevel(level);
    if (input > tr.value) {
        tr.x -= (input - tr.value)
        tr.value = input
        // console.log("Target found on top side " + JSON.stringify(tr))
        return tr;
    }

    let ss = startForLevel(level);
    ss.y += (input - ss.value)
    ss.value = input
    // console.log("Target found on right side " + JSON.stringify(ss))
    return ss;
}

console.log("Part 1 " + manhattan(coordsFor(input)))

let memos = {}
memos["0, 0"] = 1

function valueFor(x, y) {
    let key = `${x}, ${y}`
    if (memos.hasOwnProperty(key)) {
        return memos[key]
    }
    return 0;
}

for (let i = 2; i < input; i++) {
    let c = coordsFor(i)
    let total = 0
    total += valueFor(c.x - 1, c.y + 1)
    total += valueFor(c.x, c.y + 1)
    total += valueFor(c.x + 1, c.y + 1)

    total += valueFor(c.x - 1, c.y)
    total += valueFor(c.x + 1, c.y)

    total += valueFor(c.x - 1, c.y - 1)
    total += valueFor(c.x, c.y - 1)
    total += valueFor(c.x + 1, c.y - 1)

    let key = `${c.x}, ${c.y}`
    memos[key] = total
    // console.log("Value at " + JSON.stringify(c) + " is " + total)
    if (total > input) {
        console.log("Found part 2 " + total)
        break
    }
}
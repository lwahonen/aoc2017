import {fetchInputData, keyCount} from "./libraries.js";
import _ from 'lodash';

const year = 2017
const day = 19;

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

let map = file.split("\n").map(f => f.split(""))

let r = 0
let c = 0

let maxC = map[0].length;
let maxR = map.length

for (let i = 0; i < maxC; i++) {
    if (map[0][i] == "|") {
        console.log("Found entry point at " + i)
        c = i
        break
    }
}

let part1=""
function isLetter(a) {
    if (a.charAt(0).match(/[a-zA-Z]/)) {
        part1+=a
        return true
    }
    return false
}

let dir = 'S'
let steps=0
while (true) {
    steps++
    // console.log("Location " + r + ", " + c + " travelling " + dir + " here is " + map[r][c])
    if (dir == "N") {
        let north = map[r - 1][c]
        if (north == "|" || north == "+" || north == "-" || isLetter(north)) {
            r--
            continue
        }
        if (north == " ") {
            let west = map[r][c - 1];
            if (west == "-" || west == "+" || isLetter(west)) {
                dir = "W"
                c--
                continue
            }
            let east = map[r][c + 1];
            if (east == "-" || east == "+" || isLetter(east)) {
                dir = "E"
                c++
            }
            continue
        }
        console.log("Found the end of the trail, part 1 "+part1+" steps "+steps)
        break
    }


    if (dir == "S") {
        let south = map[r + 1][c]
        if (south == "|" || south == "+" || south == "-" || isLetter(south)) {
            r++
            continue
        }
        if (south == " ") {
            let west = map[r][c - 1];
            if (west == "-" || west == "+" || isLetter(west)) {
                dir = "W"
                c--
                continue
            }
            let east = map[r][c + 1];
            if (east == "-" || east == "+" || isLetter(east)) {
                dir = "E"
                c++
                continue
            }
        }
        console.log("Found the end of the trail, part 1 "+part1+" steps "+steps)
        break
    }


    if (dir == "E") {
        let east = map[r][c + 1]
        if (east == "-" || east == "+" || east == "|" || isLetter(east)) {
            c++
            continue
        }
        if (east == " ") {
            let north = map[r - 1][c];
            if (north == "|" || north == "+" || isLetter(north)) {
                dir = "N"
                r--
                continue
            }
            let south = map[r + 1][c];
            if (south == "|" || south == "+" || isLetter(south)) {
                dir = "S"
                r++
                continue
            }
        }
        console.log("Found the end of the trail, part 1 "+part1+" steps "+steps)
        break
    }

    if (dir == "W") {
        let west = map[r][c - 1]
        if (west == "-" || west == "+" || west == "|" || isLetter(west)) {
            c--
            continue
        }
        if (west == " ") {
            let north = map[r - 1][c];
            if (north == "|" || north == "+" || isLetter(north)) {
                dir = "N"
                r--
                continue
            }
            let south = map[r + 1][c];
            if (south == "|" || south == "+" || isLetter(south)) {
                dir = "S"
                r++
                continue
            }
        }
        console.log("Found the end of the trail, part 1 "+part1+" steps "+steps)
        break
    }

}
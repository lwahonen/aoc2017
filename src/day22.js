import {fetchInputData, keyCount} from "./libraries.js";
import isprime from 'isprime';

const year = 2017
const day = 22;

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


let input = file.trim().split("\n").map(f => f.split(""))

function getkey(row, col) {
    return "" + row + ", " + col
}

let map={}
for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
        map[getkey(row, col)] = input[row][col]
    }
}

function turnRight(dir) {
    if(dir == "N")
        return "E";
    if(dir == "E")
        return "S";
    if(dir == "S")
        return "W";
    if(dir == "W")
        return "N";
}

function turnLeft(dir) {
    if(dir == "N")
        return "W";
    if(dir == "W")
        return "S";
    if(dir == "S")
        return "E";
    if(dir == "E")
        return "N";
}


function move(row, col, dir) {
    if (dir == "N")
        return {row: row - 1, col: col};
    if (dir == "W")
        return {row: row, col: col - 1};
    if (dir == "S")
        return {row: row + 1, col: col};
    if (dir == "E")
        return {row: row, col: col + 1};
}

let part1=0
let row=Math.floor(input.length / 2)
let col=row
let dir="N"


for (let i = 0; i < 10000; i++) {
    let key = getkey(row, col);
    let here = ".";
    if (map.hasOwnProperty(key)) {
        here = map[key];
    }
    if (here == "#") {
        dir=turnRight(dir);
        map[key]="."
        let moved=move(row, col, dir);
        row=moved.row
        col=moved.col
    }
    if(here == ".") {
        dir = turnLeft(dir);
        part1++
        map[key] = "#"
        let moved = move(row, col, dir);
        row=moved.row
        col=moved.col
    }
}

console.log(part1)
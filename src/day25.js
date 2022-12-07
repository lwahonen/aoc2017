import {fetchInputData, keyCount} from "./libraries.js";
import isprime from 'isprime';

const year = 2017
const day = 25;

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

let input = file.trim().split("\n\n").slice(1)

let states = {}
for (let instr of input) {
    let c = instr.split("\n")
    let name = c[0].substr(-2, 1)
    let write_0 = parseInt(c[2].substr(-2, 1))
    let move_0;
    if (c[3] == "    - Move one slot to the right.") {
        move_0 = 1;
    } else {
        move_0 = -1
    }
    let state_0 = c[4].substr(-2, 1)

    let write_1 = parseInt(c[6].substr(-2, 1))
    let move_1;
    if (c[7] == "    - Move one slot to the right.") {
        move_1 = 1;
    } else {
        move_1 = -1
    }
    let state_1 = c[8].substr(-2, 1)
    states[name + "/0"] = {write: write_0, move: move_0, state: state_0}
    states[name + "/1"] = {write: write_1, move: move_1, state: state_1}
}
console.log(JSON.stringify(states))

let tape = {}

function tapeRead(pos) {
    if (tape.hasOwnProperty(pos)) {
        return tape[pos]
    }
    return 0
}

let params = file.trim().split("\n\n")[0].split("\n")
let loops = parseInt(params[1].split(" ")[5])

let state = params[0].substr(-2, 1)
let pos = 0
for (let i = 0; i < loops; i++) {
    let read = tapeRead(pos)
    let key = state + "/" + read
    let next = states[key]
    tape[pos] = next["write"]
    pos += next["move"]
    state = next["state"]
}
let part1 = 0;
for (const p in tape) {
    if (tape[p] == 1) {
        part1++
    }
}
console.log(part1)
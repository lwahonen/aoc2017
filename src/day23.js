import {fetchInputData, keyCount} from "./libraries.js";
import isprime from 'isprime';

const year = 2017
const day = 23;

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

function getValue(regs, p) {
    if (Number.isInteger(p)) {
        return p
    }
    if (p.match(/[a-z]/)) {
        if (regs.hasOwnProperty(p)) {
            return regs[p]
        }
        return 0
    }
    return parseInt(p)
}


let regs_1 = {}
let mul_count = 0


runMachine(regs_1, 0)
console.log(mul_count)

function runMachine(regs, ipc) {
    while (ipc >= 0 && ipc < input.length) {
        let row = input[ipc]
        let inst = row[0]
        if (inst == "set") {
            let v = getValue(regs, row[2])
            regs[row[1]] = v
            ipc++
        }
        if (inst == "sub") {
            let v = getValue(regs, row[2])
            regs[row[1]] = getValue(regs, row[1]) - v
            ipc++
        }
        if (inst == "mul") {
            let v = getValue(regs, row[2])
            regs[row[1]] = v * getValue(regs, row[1])
            ipc++
            mul_count++
        }
        if (inst == "jnz") {
            let x = getValue(regs, row[1])
            let y = getValue(regs, row[2])
            if (x != 0) {
                ipc += y
            } else {
                ipc++
            }
        }
    }
}

console.log(part2(parseInt(input[0][2])))

function part2(n) {
    // Prep
    let regs = {}
    regs["h"] = 0
    // set b 84
    // set c b
    regs["b"] = n
    regs["c"] = n
    // jnz a 2
    // jnz 1 5
    // mul b 100
    // sub b -100000
    // set c b
    // sub c -17000
    regs['b'] = regs['b'] * 100 - (-100000)
    regs['c'] = regs['b'] - (-17000)
    do {
        // set f 1
        // set d 2
        // set e 2
        // set g d
        // mul g e
        // sub g b
        // jnz g 2
        // set f 0
        // sub e -1
        // set g e
        // sub g b
        // jnz g -8
        // sub d -1
        // set g d
        // sub g b
        // jnz g -13
        // jnz f 2
        // sub h -1
        if (!isprime(regs["b"])) {
            regs['h']++
        }
        // set g b
        // sub g c
        // jnz 1 3
        // sub b -17
        regs['g'] = regs['b'] - regs['c']
        regs['b'] += 17
        // If g not zero, jump -23 == restart loop, otherwise jump +3 = IPC out of bounds = End the program
        // jnz g 2
        // jnz 1 3
        // jnz 1 -23
   } while (regs['g'] !== 0)

    return regs['h']
}

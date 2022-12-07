import {fetchInputData, keyCount} from "./libraries.js";

const year = 2017
const day = 18;

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

let input=file.trim().split("\n").map(f=>f.split(" "))

function getValue(regs, p)
{
    if(Number.isInteger(p))
        return p
    if(p.match(/[a-z]/))
    {
        if(regs.hasOwnProperty(p))
            return regs[p]
        return 0
    }
    return parseInt(p)
}


let ipc_1=0
let regs_1={}
regs_1["p"]=0
let ipc_2=0
let regs_2={}
regs_2["p"]=1
let receive_1=[]
let receive_2=[]

let sent_first=0
let printed=false;
let frequency=0
while (true) {
    let result_first = runMachine(receive_1, ipc_1, regs_1, 0)
    ipc_1 = result_first.ipc
    receive_2.push(...result_first.send)
    let result_second = runMachine(receive_2, ipc_2, regs_2, 1)
    ipc_2 = result_second.ipc
    receive_1.push(...result_second.send)

    if (receive_1.length == 0 && receive_2.length == 0)
        break
}
console.log("Part 2 "+sent_first)

function runMachine(received, ipc, regs, machineId) {
    let send=[]
    while (ipc >= 0 && ipc < input.length) {
        let row = input[ipc]
        let inst = row[0]
        if (inst == "snd") {
            let snd = getValue(regs, row[1])
            ipc++
            if(machineId == 0) {
                frequency = snd
            }
            if (machineId == 1)
                sent_first++
            send.push(snd)
        }
        if (inst == "set") {
            let v = getValue(regs, row[2])
            regs[row[1]] = v
            ipc++
        }
        if (inst == "add") {
            let v = getValue(regs, row[2])
            regs[row[1]] = v + getValue(regs, row[1])
            ipc++
        }
        if (inst == "mul") {
            let v = getValue(regs, row[2])
            regs[row[1]] = v * getValue(regs, row[1])
            ipc++
        }
        if (inst == "mod") {
            let v = getValue(regs, row[2])
            regs[row[1]] = getValue(regs, row[1]) % v
            ipc++
        }
        if (inst == "rcv") {
            if(machineId == 0 && !printed && frequency != 0) {
                console.log("Part 1 " + frequency)
                printed = true
            }
            if (received.length == 0)
                return {send: send, ipc: ipc}
            regs[row[1]] = received.shift();
            ipc++
        }
        if (inst == "jgz") {
            let x = getValue(regs, row[1])
            let y = getValue(regs, row[2])
            if (x > 0)
                ipc += y
            else
                ipc++
        }
    }
}


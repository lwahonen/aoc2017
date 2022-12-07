import {fetchInputData, keyCount} from "./libraries.js";

const year = 2017
const day = 8;

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

let input = file.trim().split("\n")

let regs={}

function getReg(check) {
    let r = 0
    if (regs.hasOwnProperty(check)) {
        r = regs[check]
    }
    return r;
}

let max=0;
for(let row of input)
{
    let items=row.split(" ")
    let target=items[0]
    let mod=0
    if(items[1] == "inc")
        mod=parseInt(items[2])
    else
        mod=parseInt(items[2])*-1
    let check=items[4]
    let op=items[5]
    let comp=parseInt(items[6])
    let currentValue = getReg(check);
    if(op == "<" && currentValue < comp)
        regs[target]=getReg(target)+mod
    if(op == ">" && currentValue > comp)
        regs[target]=getReg(target)+mod
    if(op == "<=" && currentValue <= comp)
        regs[target]=getReg(target)+mod
    if(op == ">=" && currentValue >= comp)
        regs[target]=getReg(target)+mod
    if(op == "==" && currentValue == comp)
        regs[target]=getReg(target)+mod
    if(op == "!=" && currentValue != comp)
        regs[target]=getReg(target)+mod
    max=Math.max(max, getReg(target))
    console.log("Ran "+row+" regs now "+JSON.stringify(regs))
}

console.log(Math.max(...Object.values(regs)))
console.log(max)
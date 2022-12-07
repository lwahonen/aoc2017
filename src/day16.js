import {fetchInputData, keyCount} from "./libraries.js";

const year = 2017
const day = 16;

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

let input=file.trim().split(",")

let dance=[]
for (let i = 0; i < 16; i++) {
    dance.push(String.fromCharCode(97+i))
}

function do_dance_round (){
    for (const step of input) {
        if (step.charAt(0) == "s") {
            let spinCount = 16 - parseInt(step.substring(1));
            let head = dance.slice(0, spinCount)
            let tail = dance.slice(spinCount)
            dance = tail.concat(head)
        }
        if (step.charAt(0) == "x") {
            let xc = step.substring(1).split("/").map(f => parseInt(f));
            let temp = dance[xc[0]]
            dance[xc[0]] = dance[xc[1]]
            dance[xc[1]] = temp
        }
        if (step.charAt(0) == "p") {
            let xc = step.substring(1).split("/");
            let first = dance.indexOf(xc[0])
            let second = dance.indexOf(xc[1])
            let temp = dance[first]
            dance[first] = dance[second]
            dance[second] = temp
        }
        // console.log(step)
        // console.log(dance)
    }
}
let seen={}
let round=0
let first=true
while (true)
{
    let result = dance.join("");
    if (seen.hasOwnProperty(result)) {
        console.log("Found the loop at round " + round)
        break
    }
    seen[result]=round;
    do_dance_round()
    round++
    if(first) {
        console.log("Part 1 "+dance.join(""))
    }
    first=false;
}
let steps=1000000000 % round
for (let i = 0; i < steps; i++) {
    do_dance_round()
}
let result = dance.join("");
console.log("Part 2 "+result)

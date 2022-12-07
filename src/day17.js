import {fetchInputData, keyCount} from "./libraries.js";

const year = 2017
const day = 17;

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

let input=parseInt(file.trim())

let buf={}
buf.next=buf
buf.val=0


for (let i = 1; i <= 50000000; i++) {
    for (let j = 0; j < input; j++) {
        buf = buf.next
    }
    let ins = {}
    ins.next = buf.next
    buf.next = ins
    ins.val = i
    buf = ins
    if (i == 2017) {
        console.log(ins.next.val)
    }
}
let first=buf
while (first.val != 0)
    first=first.next
console.log(first.next.val)
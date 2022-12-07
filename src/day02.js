import {fetchInputData} from "./libraries.js";

const year = 2017
const day = 2;

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
input = input.map(f => f.split("\t"))
input = input.map(g => g.map(s => parseInt(s)));

let part1=0
for(let r of input)
{
    let min=Math.min(...r)
    let max=Math.max(...r)
    part1+=max-min
}
console.log(part1)
findDivisor([5, 9, 2, 8])

let part2=0
for(let r of input)
{
    part2+=findDivisor(r)
}
console.log(part2)

function findDivisor(nums) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if(j === i)
                continue;
            if (nums[i] % nums[j] === 0)
                return nums[i] / nums[j]
        }
    }
}
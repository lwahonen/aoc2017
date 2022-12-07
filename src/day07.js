import {fetchInputData, keyCount} from "./libraries.js";

const year = 2017
const day = 7;

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

// input = `
//
// pbga (66)
// xhth (57)
// ebii (61)
// havc (66)
// ktlj (57)
// fwft (72) -> ktlj, cntj, xhth
// qoyq (66)
// padx (45) -> pbga, havc, qoyq
// tknk (41) -> ugml, padx, fwft
// jptl (61)
// ugml (68) -> gyxo, ebii, jptl
// gyxo (61)
// cntj (57)
//
// `.trim().split("\n")
let nodes = {}

for (let row of input) {
    // console.log("Processing "+row)
    let items = row.split(" ");
    let name = items[0]
    let weight = parseInt(items[1].substring(1, items[1].indexOf(")")))
    let n;
    if (nodes.hasOwnProperty(name)) {
        n = nodes[name]
        n.weight = weight
    } else {
        n = {name: name, weight: weight, bottoms: {}, tops: {}}
        // console.log("Created new node "+JSON.stringify(n))
        nodes[name] = n
    }
    if (items.length > 3) {
        for (let i = 3; i < items.length; i++) {
            let kidName = items[i];
            if (kidName.endsWith(",")) {
                kidName = kidName.substring(0, kidName.length - 1)
            }
            let kid;
            if (nodes.hasOwnProperty(kidName)) {
                kid = nodes[kidName]
            } else {
                kid = {name: kidName, weight: 0, bottoms: {}, tops: {}}
                // console.log("Created new node " + JSON.stringify(kid))
                nodes[kidName] = kid
            }
            kid.tops[name] = n
            n.bottoms[kidName] = kid
            // console.log("Updated tops " + Object.keys(nodes[kidName].tops))
            // console.log("Updated bottoms " + Object.keys(nodes[name].bottoms))
        }
    }
}

let top;
for (let nn in nodes) {
    if (keyCount(nodes[nn].tops) === 0) {
        console.log("Found top of stack " + nn)
        top=nn;
    }
}

function weightFor(name) {
    let self = nodes[name].weight

    for (let kid in nodes[name].bottoms) {
        self += weightFor(kid)
    }
    return self
}

function findMismatch(name, diff) {
    let n = nodes[name]
    if (keyCount(n.bottoms) == 0) {
        return;
    }
    let weights = {}
    for (let kid in nodes[name].bottoms) {
        let newtarget = weightFor(kid)
        if (!weights.hasOwnProperty(newtarget))
            weights[newtarget] = []
        weights[newtarget].push(kid)
    }
    console.log(JSON.stringify(weights))
    if (keyCount(weights) == 1) {
        let weight = nodes[name].weight;
        console.log("Found the mismatched item, it's " + name + " at " + weight + " and should be at " + (weight - diff))
        return;
    }
    let targetWeight=0
    for (let k in weights) {
        if (weights[k].length > 1) {
            targetWeight = k
        }
    }
    for (let k in weights) {
        if (weights[k].length == 1) {
            diff=k-targetWeight
            console.log("Drilling down into subtree " + k+" because it's "+diff+" too heavy")
            return findMismatch(weights[k][0], diff)
        }
    }
}

findMismatch(top, 0)
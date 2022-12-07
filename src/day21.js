import {fetchInputData, keyCount, permutations} from "./libraries.js";
import isprime from 'isprime';

const year = 2017
const day = 21;

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

let input = file.trim().split("\n").map(f => f.split(" => "))

let rules = {}

function toKey(matrix) {
    return matrix.map(f => f.join("")).join("/")
}

let squares = ".#./..#/###".split("/").map(f => f.split(""))

for (const row of input) {
    let from = row[0].split("/").map(f => f.split(""))
    let to = row[1].split("/").map(f => f.split(""))
    for (const permutation of permutations(from)) {
        rules[toKey(permutation)] = to
    }
}

function printWorld(toprint) {
    let cells=0
    console.log("\n\n--\n\n")
    let size = toprint.length
    for (let row = 0; row < toprint.length; row++) {
        let output = ""
        for (let col = 0; col < toprint.length; col++) {
            let point = toprint[row][col];
            if(point == "#")
                cells++
            output += point
        }
        console.log(output)
    }
    return cells
}

for (let round = 0; round < 18; round++) {
    // printWorld(squares)
    let news = []
    let rules_matched = []
    if (squares.length % 2 == 0) {
        let squareCount = squares.length / 2;
        for (let row = 0; row < 3 * squareCount; row++) {
            news[row] = []
            for (let col = 0; col < 3 * squareCount; col++) {
                news[row][col] = "X"
            }
        }
        for (let row = 0; row < squareCount; row++) {
            for (let col = 0; col < squareCount; col++) {
                let twotwo = []
                twotwo[0] = [squares[row * 2][col*2], squares[row * 2][col*2 + 1]]
                twotwo[1] = [squares[row * 2 + 1][col*2], squares[row * 2 + 1][col*2 + 1]]
                let rule = rules[toKey(twotwo)];
                rules_matched.push(rule)
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        news[i + row * 3][j + col * 3] = rule[i][j]
                    }
                }
                // console.log("Matched "+JSON.stringify(twotwo)+" to "+toKey(rule))
                // printWorld(news)
            }
        }
    } else {
        let squareCount = squares.length / 3;
        for (let row = 0; row < 4 * squareCount; row++) {
            news[row] = []
            for (let col = 0; col < 4 * squareCount; col++) {
                news[row][col] = "X"
            }
        }
        for (let row = 0; row < squareCount; row++) {
            for (let col = 0; col < squareCount; col++) {
                let threethree = []
                threethree[0] = [squares[row * 3][col * 3], squares[row * 3][col * 3 + 1], squares[row * 3][col * 3 + 2]]
                threethree[1] = [squares[row * 3 + 1][col * 3], squares[row * 3 + 1][col * 3 + 1], squares[row * 3 + 1][col * 3 + 2]]
                threethree[2] = [squares[row * 3 + 2][col * 3], squares[row * 3 + 2][col * 3 + 1], squares[row * 3 + 2][col * 3 + 2]]
                let rule = rules[toKey(threethree)];
                rules_matched.push(rule)
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 4; j++) {
                        news[i + row * 4][j + col * 4] = rule[i][j]
                    }
                }
                // console.log("Matched "+JSON.stringify(threethree)+" to "+toKey(rule))
                // printWorld(news)
            }

        }
    }
    //
    squares = news
    if(round == 4) {
        let count = squares.flat().filter(f => f == "#").length
        console.log("Part 1 "+count)
    }

}
let count = squares.flat().filter(f => f == "#").length
console.log("Part 2 "+count)


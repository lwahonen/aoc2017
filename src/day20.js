import {fetchInputData, keyCount} from "./libraries.js";
import _ from 'lodash';

const year = 2017
const day = 20;

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
let id = 0

function parseRow(f) {
    let pairs = f.match(/p=<(-?\d+),(-?\d+),(-?\d+)>, v=<(-?\d+),(-?\d+),(-?\d+)>, a=<(-?\d+),(-?\d+),(-?\d+)>/)
    return {
        id: id++,
        pX: parseInt(pairs[1]),
        pY: parseInt(pairs[2]),
        pZ: parseInt(pairs[3]),
        vX: parseInt(pairs[4]),
        vY: parseInt(pairs[5]),
        vZ: parseInt(pairs[6]),
        aX: parseInt(pairs[7]),
        aY: parseInt(pairs[8]),
        aZ: parseInt(pairs[9])
    }
}

//p=<1500,413,-535>, v=<-119,22,36>, a=<-5,-12,3>
let input = file.trim().split("\n").map(f => parseRow(f))
let minAcc = 9999999
let smallest;

for (const particle of input) {
    let acc = Math.abs(particle.aX) + Math.abs(particle.aY) + Math.abs(particle.aZ)
    particle.acceleration = acc;
    let velo = Math.abs(particle.vX) + Math.abs(particle.vY) + Math.abs(particle.vZ)
    particle.velocity = velo;
    let pos = Math.abs(particle.pX) + Math.abs(particle.pY) + Math.abs(particle.pZ)
    particle.position = pos;
}
input = _.orderBy(input, 'position', 'asc');
input = _.orderBy(input, 'velocity', 'asc');
input = _.orderBy(input, 'acceleration', 'asc');

console.log("Smallest is " + input[0].id)

function mapKey(p) {
    return `${p.pX},${p.pY},${p.pZ}`;
}

let particles = {}
for (const p of input) {
    particles[mapKey(p)] = p
}

let happened = true
while (happened) {
    happened = false;
}
for (let i = 0; i < 10000; i++) {
    let newParticles = {};
    let killparticles = []
    for (const pkey in particles) {
        let particle = particles[pkey]
        particle.vX += particle.aX
        particle.vY += particle.aY
        particle.vZ += particle.aZ

        particle.pX += particle.vX
        particle.pY += particle.vY
        particle.pZ += particle.vZ
        let key = mapKey(particle);
        if (newParticles.hasOwnProperty(key)) {
            killparticles.push(key)
            happened = true
        }
        newParticles[key] = particle
    }
    for (const kill of killparticles) {
        delete newParticles[kill]
    }
    particles = newParticles
}
console.log("Particles remaining " + keyCount(particles))
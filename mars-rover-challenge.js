/** Assumptions made include:
 *      1. Rover stops itself before committing suicide off the plateau
 *      2. NASA understands the mission boundaries, as such x and y values cannot go negative
 *      3. The plateau is conveniently a square, and not some awful shape. [0,0] -> [5,5] are valid bounds for a square
 *      4. NASA doesn't mind that there's an extra newline on the final output for clean code :)
 *      5. Initial landing coordinates exist inside the given boundaries
 *
 */
var fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);
// Would set as constants, but evaluated inside the for loop later
let xMax
let yMax

let currX = 0
let currY = 0
let landingArr = []
let instructionsArr = []
let currDir = 0

// Set up base values
for (let line of lines) {
    if (line.includes('Plateau')) {
        let arrHolder = line.split(':')[1].split(' ')
        xMax = arrHolder[0]
        yMax = arrHolder[1]
    }
    else if (line.includes('Landing')) {
        let arrHolder = line.split(':')[1].split(' ')
        landingArr.push(arrHolder)
    } else {
        let arrHolder = line.split(':')[1].split('')
        instructionsArr.push(arrHolder)
    }
    //console.log(`${JSON.stringify(landingArr)} ${JSON.stringify(instructionsArr)}`);
}

let finalLanding = ''
let landerIncr = 0
for (let index in landingArr) {
    finalLanding += `Rover${++landerIncr}:${beginMission(landingArr[index], instructionsArr[index])}\n`
}
console.log(finalLanding)

// Turns a cardinal direction into a 0 - 3 value, increasing clockwise from 0
function dirToInt (dir) {
    if (dir === 'N') {
        return 0
    } else if (dir === 'E') {
        return 1
    } else if (dir === 'S') {
        return 2
    } else {
        return 3
    }
}

// Reverse of dirToInt, returns the matching cardinal direction to the given val
function intToDir (val) {
    val = absDir(val)
    if (val === 0) {
        return 'N'
    } else if (val === 1) {
        return 'E'
    } else if (val === 2) {
        return 'S'
    } else {
        return 'W'
    }
}

// Accepts direction from dirToInt
function moveRover (direction) {
    if (direction === 0) { // North
        if (currY < yMax) {
            currY++
        }
    } else if (direction === 1) { // East
        if (currX < xMax) {
            currX++
        }
    } else if (direction === 2) { // South
        if (currY > 0) {
            currY--
        }
    } else { // West
        if (currX > 0) {
            currX--
        }
    }
}

function absDir(val) {
    val = val%4
    // Adding 4 to a negative direction returns the correct positive orientation
    if (val < 0) {
        val+=4
    }
    return val
}

function beginMission (start, moveArr) {
    currX = start[0]
    currY = start[1]
    currDir = dirToInt(start[2])
    for (let command of moveArr) {
        if (command === 'L') {
            currDir--
        }
        else if (command === 'R') {
            currDir++
        } else {
            moveRover(absDir(currDir))
        }
    }
    return `${currX}, ${currY}, ${intToDir(currDir)}`
}
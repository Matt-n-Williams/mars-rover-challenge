var rewire = require('rewire')
var chai = require('chai')
var sinon = require('sinon')
var mocha = require('mocha')

let should = chai.should()
let roverObj = rewire('../mars-rover-challenge')

describe('Mars Rover Challenge Tests', function() {
    describe('dirToInt Function Tests', function() {
        it('Returns correctly given N', function() {
            let answer = roverObj.__get__('dirToInt')('N')
            chai.assert.equal(answer, 0)
        })
        it('Returns correctly given W', function() {
            let answer = roverObj.__get__('dirToInt')('W')
            chai.assert.equal(answer, 3)
        })
    })
    describe('intToDir Function Tests', function() {
        //stub out absDir function
        it('Returns correctly given a positive value', function() {
            let answer = roverObj.__get__('intToDir')(5)
            chai.assert.equal(answer, 'E')
        })
        it('Returns correctly given a negative value', function() {
            let answer = roverObj.__get__('intToDir')(-5)
            chai.assert.equal(answer, 'W')
        })
    })
    // Uses too many imbeded values, could be modularized
    // describe('moveRover Function Tests', function() {
    //     let yMax, xMax, currX, currY
    //     beforeEach(function () {
    //         yMax = 5
    //         xMax = 5
    //         currX = 0
    //         currY = 0
    //     })
    //     it('Returns correctly given a positive value', function() {
    //         roverObj.__get__('moveRover')('E')
    //         chai.assert.equal(currY, 1)
    //     })
    //     it('Returns correctly given a negative value', function() {
    //         roverObj.__get__('moveRover')('N')
    //         chai.assert.equal(currX, 1)
    //     })
    // })
    describe('absDir Function Tests', function() {
        it('Returns correctly given a positive value', function() {
            let answer = roverObj.__get__('absDir')(5)
            chai.assert.equal(answer, 1)
        })
        it('Returns correctly given a negative value', function() {
            let answer = roverObj.__get__('absDir')(-5)
            chai.assert.equal(answer, 3)
        })
    })
    describe('beginMission Function Tests', function() {
        //stub out dirToInt function
        it('Returns correctly given a movement over an edge', function() {
            let answer = roverObj.__get__('beginMission')([5, 5, 'E'], ['M','M','M','M'])
            chai.assert.equal(answer, '5, 5, E')
        })
        it('Returns correctly given one of each value', function() {
            let answer = roverObj.__get__('beginMission')([4, 4, 'N'], ['L','M','R','M'])
            chai.assert.equal(answer, '3, 5, N')
        })
    })
})
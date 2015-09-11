// sudoku_solver_spec.js
var Chai = require('chai');
var expect = Chai.expect;
var assert = Chai.assert;
var solver = require('./sudoku_solver');


var validBoard;
var emptyPositions;

describe('#readInBoard()', function() {
    it('given a filename it should read in the board', function() {
        validBoard = solver.readInBoard('./boards/example1.txt');
        var expectedBoard = [
            [0,9,0,0,0,0,0,0,6],
            [0,0,0,9,6,0,4,8,5],
            [0,0,0,5,8,1,0,0,0],
            [0,0,4,0,0,0,0,0,0],
            [5,1,7,2,0,0,9,0,0],
            [6,0,2,0,0,0,3,7,0],
            [1,0,0,8,0,4,0,2,0],
            [7,0,6,0,0,0,8,1,0],
            [3,0,0,0,9,0,0,0,0]
        ];
        expect(validBoard.length).to.equal(9);
        expect(validBoard[0].length).to.equal(9);
        expect(validBoard).to.eql(expectedBoard);
    });
});

describe('#emptyCells()',function() {
    it('given a board, it should return an array of empty cells', function() {
        emptyPositions = solver.emptyCells(validBoard);
        
        var expectedPositions = [
            [0,0],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,0],[1,1],
            [1,2],[1,5],[2,0],[2,1],[2,2],[2,6],[2,7],[2,8],[3,0],
            [3,1],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[4,4],[4,5],
            [4,7],[4,8],[5,1],[5,3],[5,4],[5,5],[5,8],[6,1],[6,2],
            [6,4],[6,6],[6,8],[7,1],[7,3],[7,4],[7,5],[7,8],[8,1],
            [8,2],[8,3],[8,5],[8,6],[8,7],[8,8]
        ];
        expect(emptyPositions.length).to.equal(51);
        expect(emptyPositions).to.eql(expectedPositions);
    });
})

describe('#checkRow()',function() {
   it('it should check that each value given does not equal the input', function() {
      expect(solver.checkRow(validBoard,0,9)).to.equal(false);
      expect(solver.checkRow(validBoard,8,7)).to.equal(true);
   });
});

describe('#checkColn()',function() {
    it('it should check that each value given does not equal the input', function() {
        expect(solver.checkColumn(validBoard,0,5)).to.equal(false);
        expect(solver.checkColumn(validBoard,8,4)).to.equal(true);
    });
});

describe('#check3x3()',function() {
    it('it should check that each value inside a 3x3 box does not equal the input', function() {
        expect(solver.check3x3(validBoard,0,0,8)).to.equal(true);
        expect(solver.check3x3(validBoard,0,0,9)).to.equal(false);
        expect(solver.check3x3(validBoard,6,6,2)).to.equal(false);
        expect(solver.check3x3(validBoard,7,7,9)).to.equal(true);
        expect(solver.check3x3(validBoard,7,7,8)).to.equal(false);
    });
});

describe('#backtraceAlgorithm()',function() {
    it('solves the puzzle, it should return the correct board', function() {
        
        var expectedSolution = [[ 8,9,5,7,4,2,1,3,6 ],
                                [ 2,7,1,9,6,3,4,8,5 ],
                                [ 4,6,3,5,8,1,7,9,2 ],
                                [ 9,3,4,6,1,7,2,5,8 ],
                                [ 5,1,7,2,3,8,9,6,4 ],
                                [ 6,8,2,4,5,9,3,7,1 ],
                                [ 1,5,9,8,7,4,6,2,3 ],
                                [ 7,4,6,3,2,5,8,1,9 ],
                                [ 3,2,8,1,9,6,5,4,7 ]];
        
        var soln = solver.backtraceAlgorithm(validBoard, emptyPositions);
        expect(soln).to.eql(expectedSolution);
        
        var inValidBoard = [[9,9,0,0,0,0,0,0,6],
                            [0,0,0,9,6,0,4,8,5],
                            [0,0,0,5,8,1,0,0,0],
                            [0,0,4,0,0,0,0,0,0],
                            [5,1,7,2,0,0,9,0,0],
                            [6,0,2,0,0,0,3,7,0],
                            [1,0,0,8,0,4,0,2,0],
                            [7,0,6,0,0,0,8,1,0],
                            [3,0,0,0,9,0,0,0,0]];
        
        var invalidSoln = solver.backtraceAlgorithm(inValidBoard, solver.emptyCells(inValidBoard));
        expect(invalidSoln).to.eql(undefined);
    });
});
    

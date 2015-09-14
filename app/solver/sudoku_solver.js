var fs = require('fs');

/**
* Reads in sudoku board from a file with spaces inbetween numbers and new line for
* each row.
* @param {string} filename - path to board text file
* @return {Array.<Array.<number>>} A 2D array of numbers, ranging from 0-9
*/
function readInBoard(filename) { //TODO: make this NxN 
    var board = [];
    var data = fs.readFileSync(filename,'utf8');
    var remaining = '';
    remaining+=data;
    var index = remaining.indexOf('\n');
    
    while (index > -1) {
        var line = remaining.substring(0, index).split(' ');
        for(var i=0; i<line.length;i++) {line[i] = +line[i]} //convert string to numbers
        board.push(line);
        remaining = remaining.substring(index + 1);
        index = remaining.indexOf('\n');
    }
    return board;
}

/**
* Takes in a board and returns an array containing the locations of the empty cells.
* @param {Array.<Array.<number>>} board - 2D array of numbers, ranging from 0-9 with size 
* numRows X numColns.
* @return {Array.<Array.<number>>} An array containing the locations of the empty cells.
*/
function emptyCells(board) {
    var emptyCells = [];
    var numRows = board.length;
    var numColns = board[0].length;
    
    for(var i=0;i<numRows;i++) {
        for(var j=0;j<numColns;j++) {
            if(board[i][j] === 0) emptyCells.push([i,j]);   
        }
    }
    return emptyCells;
}

/**
* Checks a row from the board for the given value
* @param {Array.<Array.<Number>>} board - 2D array of numbers, ranging from 0-9 with size 
* numRows X numColns.
* @param {number} row - the row index that is being looped over
* @param {number} value - the value that is being compared
* @return {boolean} If match found return false, else return true
*/
function checkRow(board, row, value) {
    var numColns = board[0].length;
    
    for(var j=0; j<numColns; j++) {
        if(value === board[row][j]) {
            return false;   
        }
    }
    return true;  
}

/**
* Checks a column from the board for the given value
* @param {Array.<Array.<number>>} board - 2D array of numbers, ranging from 0-9 with size 
* numRows X numColns.
* @param {number} col - the column index that is being looped over
* @param {number} value - the value that is being compared
* @return {boolean} If match found return false, else return true
*/
function checkColumn(board, col, value) {
    var numRows = board.length;
    
    for(var i=0; i<numRows; i++) {
        if(value === board[i][col]) {
            return false;   
        }
    }
    return true;
}

/**
* Check 3x3 box for the given value.
* @param {Array.<Array.<number>>} board - 2D array of numbers, ranging from 0-9 with size 
* numRows X numColns.
* @param {number} row - the row index that is used to locate correct 3x3 box
* @param {number} col - the column index that is used to locate correct 3x3 box
* @param {number} value - the value that is being compared
* @return {boolean} If match found return false, else return true
*/
function check3x3(board, row, col, value) {
    var rowBoxNum = Math.floor(row/3);
    var rowColNum = Math.floor(col/3);
    var factor = board.length/3; //assumes board is divided into 3 sections
    
    for(var i=rowBoxNum*factor; i<(rowBoxNum+1)*factor; i++) {
        for(var j=rowColNum*factor; j<(rowColNum+1)*factor; j++) {
            if(value === board[i][j]) {
                return false;   
            }
        }
    }
    return true;
}

/**
* Uses backtrace algorithm to solve a given board.
* @param {Array.<Array.<number>>} board - 2D array of numbers, ranging from 0-9 with size 
* numRows X numColns.
* @param {Array.<Array.<number>>} emptycells - 2D array containing the locations of emptycells.
* @return {Array.<Array.<number>>|undefined} Returns solution if valid board is used, else 
* returns undefined
*/
function backtraceAlgorithm(board,emptycells) {
    
    //duplicates in row, coln, and 3x3 squares cause an invalid board.
    if(!checkBoardValidity(board)) {
        return undefined;
    }
    
    for(var c=0; c<emptycells.length;) {
        var row = emptycells[c][0];
        var col = emptycells[c][1];
        var value = board[row][col] + 1;
        
        var foundValue = false;
        
        while(!foundValue) {
            if(value === 10) {
                c--;
                board[row][col] = 0;
                break;
            } else if(checkRow(board, row, value) &&  checkColumn(board, col, value) 
                      && check3x3(board, row, col, value)) {
                board[row][col] = value;
                foundValue = true;
                c++;
            } else {
                value++;
            }
        }
        
        if(c<0) {
            return undefined;
        }
    }
    return board;
}


/**
* Sets up the puzzle and solves the puzzle. A filename can be given or a board can be given.
* @param {string} filename - path to board text file
* @param {Array.<Array.<number>>} board - 2D array of numbers, ranging from 0-9 with size 
* numRows X numColns.
*/
function solvePuzzle(filename,board) {
    if(filename!==null) {
        var board = readInBoard(filename);  
    }
    var emptycells = emptyCells(board);
    return backtraceAlgorithm(board,emptycells)
}

/**
* Given a board checks for any duplicate entries in row, colomn, or 3x3 that would cause board to be invalid.
*/
function checkBoardValidity(board) {
    var isValid = true;
    board.forEach(function(row,i) {
        row.forEach(function(value,j) {
            if(value!==0) {
                var saveVal = board[i][j]; 
                board[i][j] = 0; //want to zero out the current position of the board, or else the 
                                 //check methods will always return true
                
                if(!checkRow(board,i,value) || !checkColumn(board,j,value) || !check3x3(board,i,j,value)) {
                    isValid = false;   
                }
                
                board[i][j] = saveVal;      //set back to the correct value
            }
        });
    });   
    return isValid;
}

                            
module.exports = {
    solvePuzzle: solvePuzzle,
    readInBoard: readInBoard,
    emptyCells: emptyCells,
    checkRow: checkRow,
    checkColumn: checkColumn,
    check3x3: check3x3,
    backtraceAlgorithm: backtraceAlgorithm,
    checkBoardValidity: checkBoardValidity
}

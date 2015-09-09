var fs = require('fs');

var numRows = 9;
var numColns = 9;

/**
* Reads in sudoku board from a file with the format:
* xxxxxxxxx
* xxxxxxxxx
* xxxxxxxxx
* xxxxxxxxx
* xxxxxxxxx
* xxxxxxxxx
* xxxxxxxxx
* xxxxxxxxx
* xxxxxxxxx
*
*/
function readInBoard(filename) {
    var board = [];
    var data = fs.readFileSync(filename,'utf8');
    var remaining = '';
    remaining+=data;
    var index = remaining.indexOf('\r\n');
    while (index > -1) {
        var line = remaining.substring(0, index).split('');
        for(var i=0; i<line.length;i++) {line[i] = +line[i]}
        board.push(line);
        remaining = remaining.substring(index + 2);
        index = remaining.indexOf('\r\n');
    }
    return board;
    
}

/**
* Takes in a board and returns an array containing the locations of the empty cells
*/
function emptyCells(board) {
    var emptyCells = [];
    for(var i=0;i<numRows;i++) {
        for(var j=0;j<numColns;j++) {
            if(board[i][j] === 0) {
                emptyCells.push([i,j]);   
            }
            
        }
    }
    return emptyCells;
}

/**
* checks a row for the value given, returns false  if match was found. Returns true if no match was found
*/
function checkRow(board, row, value) {
    for(var j=0; j<numColns; j++) {
        if(value === board[row][j]) {
            return false;   
        }
    }
    return true;  
}

/**
* checks a colum for the value given, returns false  if match was found. Returns true if no match was found
*/
function checkColumn(board, col, value) {
    for(var i=0; i<numRows; i++) {
        if(value === board[i][col]) {
            return false;   
        }
    }
    return true;
}

/**
* Check 3x3 box for the given value, returns false if match was found. Returns true if no match was found.
*/
function check3x3(board, row, col, value) {
    var rowBoxNum = Math.floor(row/3);
    var rowColNum = Math.floor(col/3);
    for(var i=rowBoxNum*3; i<(rowBoxNum+1)*3; i++) {
        for(var j=rowColNum*3; j<(rowColNum+1)*3; j++) {
            if(value === board[i][j]) {
                return false;   
            }
        }
    }
    return true;
}

/**
* Uses backtrace algorithm to solve a given puzzle
*/
function backtraceAlgorithm(board,emptycells) {
    
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
            } else if(checkRow(board, row, value) &&  checkColumn(board, col, value) && check3x3(board, row, col, value)) {
                board[row][col] = value;
                foundValue = true;
                c++;
            } else {
                value++;
            }
        }
    }
    
    return board;
    
}

function solvePuzzle(filename) {
    var board = readInBoard(filename);
    var emptycells = emptyCells(board);
    return backtraceAlgorithm(board,emptycells)
}
                              
//console.log(solvePuzzle(process.argv[2]));

module.exports = {
    solvePuzzle: solvePuzzle,
    readInBoard: readInBoard,
    emptyCells: emptyCells,
    checkRow: checkRow,
    checkColumn: checkColumn,
    check3x3: check3x3,
    backtraceAlgorithm: backtraceAlgorithm
}

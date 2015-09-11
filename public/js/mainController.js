angular.module('sudoku_solver')
        .controller('mainController',mainController);

mainController.$inject = ['$log','mainService'];

function mainController($log, mainService) {
    var vm = this;
    var numRows = 9;
    var numColns = 9;
    
    //default board
    vm.board = [
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
    
    vm.solvePuzzle = function() {
        vm.showSolution = false;
        vm.noSolution = false;
        
        mainService.solve({board:vm.board})
            .then(function(callback) {
               if(!callback.data) {     //if failed, (i.e. no solution) show error message
                   vm.noSolution = true;
               } else {
                    vm.solution = callback.data;
                    vm.showSolution = true;
               }
            });
    }
    
    vm.disableSolveBtn = function() {
        var disable = false;
        vm.board.forEach(function(row) {
            var testValidRow = row.every(function(num) {
               return (typeof num != "undefined"  && num>=0 && num<10)
            });
            if(!testValidRow) {
                disable = true;   
            }
        });
       return disable;
    }
    
    vm.resetBoard = function() {
        vm.board = vm.board.map(function(row) {
            return row.map(function(col) {
                return 0;   
            });
        });
    }
    
}
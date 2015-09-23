(function() {
    'use strict'
    
    angular.module('sudoku_solver')
        .controller('boardController',boardController);

    boardController.$inject = ['$log','boardService','cachedService'];

    function boardController($log, boardService, cachedService) {
        var vm = this;
        var numRows = 9;
        var numColns = 9;

        //default board
        vm.currentBoard = [
            [8,0,0,0,0,0,0,0,0],
            [0,0,3,6,0,0,0,0,0],
            [0,7,0,0,9,0,2,0,0],
            [0,5,0,0,0,7,0,0,0],
            [0,0,0,0,4,5,7,0,0],
            [0,0,0,1,0,0,0,3,0],
            [0,0,1,0,0,0,0,6,8],
            [0,0,8,5,0,0,0,1,0],
            [0,9,0,0,0,0,4,0,0]];

        vm.solvePuzzle = function() {
            vm.showSolution = false;
            vm.noSolution = false;
            boardService.solve({board:vm.currentBoard}).then(wasBoardValid);
        }

        vm.disableSolveBtn = function() {
            return boardService.check(vm.currentBoard);
        }

        vm.resetBoard = function() {
            vm.currentBoard = boardService.reset(vm.currentBoard);
        }

        function wasBoardValid(response) {
            var soln = response.data;
            
            if(soln) {
                vm.solution = soln;
                vm.showSolution = true;
                cachedService.add(vm.currentBoard,vm.solution);
            } else {
                vm.noSolution = true; 
            }
        }
    }
})();
(function(){
    'use strict'
    
    angular.module('sudoku_solver')
        .service('cachedService', cachedService);

    cachedService.$inject = [];

    /**
    * Used to keep track of boards and solutions. Currently this isn't being used.
    */
    function cachedService() {
        var _boards = [];
        var _solutions = [];

        this.get = function() {
            return _boards; 
        }

        this.getSolutions = function() {
            return _solutions;
        }

        this.add = function(board, solution) {
            _boards.push(board);
            _solutions.push(solution);
        }

        this.clear = function() {
            _boards = [];
            _solutions = [];
        }
    }
})()
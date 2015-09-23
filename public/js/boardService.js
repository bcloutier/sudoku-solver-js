angular.module('sudoku_solver')
	   .factory('boardService', boardService);

boardService.$inject = ['$http'];
                          
function boardService($http) {
    return {
        solve : function(board) {
            return $http.post('/api/solve', board);
        },
        check : function(board) {
            return !(board.every(function(row) {
                return row.every(function(num) {
                    return (num != null  && num>=0 && num<10)
                });
            }));
        },
        reset : function(board) {
            return board.map(function(row) {
                return row.map(function(col) {
                    return 0;   
                });
            });   
        }
    }
}

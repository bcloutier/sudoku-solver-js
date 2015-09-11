angular.module('sudoku_solver')
	   .factory('mainService', mainService);

mainService.$inject = ['$http'];
                          
function mainService($http) {
    return {
        solve : function(board) {
            return $http.post('/api/solve', board);
        }
    }
}

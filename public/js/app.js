angular.module('sudoku_solver',[]);

angular.module('sudoku_solver')
	   .factory('mainService', mainService);

mainService.$inject = ['$http'];
                          
function mainService($http) {
    return {
        solve : function(board) {
            return $http.post('/api/solve', board);
        },
    }
}

angular.module('sudoku_solver')
        .controller('mainController',mainController);

mainController.$inject = ['$log','mainService'];

function mainController($log, mainService) {
    var vm = this;
    
    mainService.solve({board:[1,2,3]});
    
    vm.greetings = 'Hello Friend!';
}


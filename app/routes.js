var solve = require('./solver/sudoku_solver');

module.exports = function(app) {

    /**
    * Gets request board and responds with solution 
    */
    app.post('/api/solve', function(req,res) {
       console.log(); //returns array
       var ans = solve.solvePuzzle(null,req.body.board)
       res.send(ans);
    });
    
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); 
	});
    
};
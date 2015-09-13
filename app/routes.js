var solve = require('./solver/sudoku_solver');

module.exports = function(app) {

    /**
    * Gets board and responds with solution. Assumes that request board is an 2D array of numbers between 0-9
    */
    app.post('/api/solve', function(req,res) {
       console.log(); //returns array
       var ans = solve.solvePuzzle(null,req.body.board)
       res.send(ans);
    });
    
	app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname + 'public/index.html')); 
	});
    
};
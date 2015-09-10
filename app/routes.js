module.exports = function(app) {

    /**
    * Gets request board and responds with solution board
    */
    app.post('/api/solve', function(req,res) {
       console.log(req.body.board); //returns array
       res.send('Successful');
    });
    
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); 
	});
    
};
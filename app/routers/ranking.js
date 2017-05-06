module.exports = function(app){	
	//app.get('/ranking', app.middlewares.autenthication.autenthication, app.controllers.apostador.registros);	
    app.get('/ranking/:id', app.middlewares.autenthication.autenthication, app.controllers.ranking.registros);
}
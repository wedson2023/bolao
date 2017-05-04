module.exports = function(app){
	app.get('/relatorio', app.middlewares.autenthication.autenthication, app.controllers.relatorio.registros);
    app.get('/relatorio/:id', app.middlewares.autenthication.autenthication, app.controllers.relatorio.registro);
}
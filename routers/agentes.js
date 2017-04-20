module.exports = function(app){
	app.get('/agentes', app.middlewares.autenthication.autenthication, app.controllers.agentes.registros);
    app.get('/agentes/:id', app.middlewares.autenthication.autenthication, app.controllers.agentes.registro);
	app.post('/agentes', app.middlewares.autenthication.autenthication, app.controllers.agentes.cadastrar);
	app.put('/agentes/:id', app.middlewares.autenthication.autenthication, app.controllers.agentes.alterar);
    app.delete('/agentes/:id', app.middlewares.autenthication.autenthication, app.controllers.agentes.deletar);	
}
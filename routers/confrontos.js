module.exports = function(app){
	app.get('/confrontos/lista/:id', app.middlewares.autenthication.autenthication, app.controllers.confrontos.registros);
    app.get('/confrontos/:id', app.middlewares.autenthication.autenthication, app.controllers.confrontos.registro);
	app.post('/confrontos/:id', app.middlewares.autenthication.autenthication, app.controllers.confrontos.cadastrar);
	app.put('/confrontos/:id', app.middlewares.autenthication.autenthication, app.controllers.confrontos.alterar);
	app.delete('/confrontos/:id', app.middlewares.autenthication.autenthication, app.controllers.confrontos.deletar);	
}
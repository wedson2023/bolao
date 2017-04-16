module.exports = function(app){
	app.get('/confrontos/lista/:id', app.controllers.confrontos.registros);
    app.get('/confrontos/:id', app.controllers.confrontos.registro);
	app.post('/confrontos/:id', app.controllers.confrontos.cadastrar);
	app.put('/confrontos/:id', app.controllers.confrontos.alterar);
	app.delete('/confrontos/:id', app.controllers.confrontos.deletar);	
}
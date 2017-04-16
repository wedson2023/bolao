module.exports = function(app){
	app.get('/boloes', app.controllers.boloes.registros);
    app.get('/boloes/:id', app.controllers.boloes.registro);
	app.post('/boloes', app.controllers.boloes.cadastrar);
	app.put('/boloes/:id', app.controllers.boloes.alterar);
    app.delete('/boloes/:id', app.controllers.boloes.deletar);	
}
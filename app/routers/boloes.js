module.exports = function(app){
	app.get('/boloes', app.middlewares.autenthication.autenthication, app.controllers.boloes.registros);
    app.get('/boloes/:id', app.middlewares.autenthication.autenthication, app.controllers.boloes.registro);
	app.post('/boloes', app.middlewares.autenthication.autenthication, app.controllers.boloes.cadastrar);
	app.put('/boloes/:id', app.middlewares.autenthication.autenthication, app.controllers.boloes.alterar);
	app.put('/boloes/visivel/:id', app.middlewares.autenthication.autenthication, app.controllers.boloes.visivel);
    app.delete('/boloes/:id', app.middlewares.autenthication.autenthication, app.controllers.boloes.deletar);	
}
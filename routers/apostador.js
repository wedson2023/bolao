module.exports = function(app){
	app.get('/apostador/lista/:id', app.middlewares.autenthication.autenthication, app.controllers.apostador.registros);
    app.get('/apostador/:id', app.middlewares.autenthication.autenthication, app.controllers.apostador.registro);
	app.post('/apostador/:id', app.middlewares.autenthication.autenthication, app.controllers.apostador.cadastrar);
    app.delete('/apostador/:id', app.middlewares.autenthication.autenthication, app.controllers.apostador.deletar);	
}
module.exports = function(app){
	app.get('/apostador/lista/:id', app.controllers.apostador.registros);
    app.get('/apostador/:id', app.controllers.apostador.registro);
	app.post('/apostador/:id', app.controllers.apostador.cadastrar);
    app.delete('/apostador/:id', app.controllers.apostador.deletar);	
}
module.exports = function(app){
	app.get('/agentes', app.controllers.agentes.registros);
    app.get('/agentes/:id', app.controllers.agentes.registro);
	app.post('/agentes', app.controllers.agentes.cadastrar);
	app.put('/agentes/:id', app.controllers.agentes.alterar);
    app.delete('/agentes/:id', app.controllers.agentes.deletar);	
}
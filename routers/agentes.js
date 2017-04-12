module.exports = function(app){
	app.get('/agentes', app.controllers.agentes.listar);
}
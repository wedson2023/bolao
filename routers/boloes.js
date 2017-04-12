module.exports = function(app){
	app.get('/boloes', app.controllers.boloes.pesquisar);
}
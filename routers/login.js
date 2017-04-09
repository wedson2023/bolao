module.exports = function(app){
	app.get('/entrar', app.controllers.login.entrar);
	app.get('/sair', app.controllers.login.sair);
}
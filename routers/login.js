module.exports = function(app){
	app.post('/entrar', app.controllers.login.entrar);
	app.get('/sair', app.controllers.login.sair);
}
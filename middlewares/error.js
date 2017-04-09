	exports.notFound = function(req, res, next){
		res.status(404);
		res.json({'mensagem' : 'Página não encontrada'});
	}
	
	exports.serverError = function(req, res, next){
		res.status(500);
		res.json({'mensagem' : 'Algum problema no servidor'});
	}	


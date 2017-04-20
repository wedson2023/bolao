	exports.notFound = function(req, res, next){
		res.status(404).json({'mensagem' : 'Rota não encontrada'});
	}
	
	exports.serverError = function(req, res, next){		
		res.status(500).json({'mensagem' : 'Algum problema no servidor'});
	}	


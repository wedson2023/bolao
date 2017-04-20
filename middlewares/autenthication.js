exports.autenthication = function(req, res, next){
	if(typeof req.headers.token != 'undefined'){
		req.token = req.headers.token;
		next();
	}else{
		res.status(403).json({ resposta : false, mensagem : 'Você não tem autorização para acessar essa rota!'});
	}
}


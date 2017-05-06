module.exports = function(app){	
	var url = require('url');
	return {		
		registros : function(req, res){
			var limite = parseInt(url.parse(req.url, true).query.limite);
			var bolao = url.parse(req.url, true).query.bolao;
			var agente= url.parse(req.url, true).query.agente;
			
			app.models.schemas.agentes.findOne({ token : req.token }, '_id', function(err, respostas){
				if(err){
					res.status(500).json({resposta : false, mensagem : 'Houve algum problema tente novamente!', erro : err});
				}else if(respostas){
					app.models.schemas.apostador.find({ bolao : bolao, agente : agente }).limit(limite).exec(function(err, resposta){							
							res.status(200).json(resposta);
						})
				}else{
					res.status(403).json({ resposta : false, mensagem : 'Talvez você não esteja logado!'});
				}
			})
		},
		
		registro : function(req, res){
			app.models.schemas.agentes.findOne({token : req.token}, function(err, resposta){
				if(err){
					res.status(500).json({resposta : false, mensagem : 'Houve algum problema tente novamente!', erro : err});
				}else if(resposta){
					app.models.schemas.apostador.findById(req.params.id, function(err, resposta){						
						res.status(200).json(resposta);
					})	
				}else{
					res.status(403).json({ resposta : false, mensagem : 'Talvez você não esteja logado!'});
				}
			})
		},
		
		cadastrar : function(req, res){
			var apostador = new app.models.schemas.apostador();
			app.models.schemas.agentes.findOne({token : req.token}, 'token', function(err, resposta){
				if(err){
					res.status(500).json({resposta : false, mensagem : 'Houve algum problema tente novamente!', erro : err});
				}else if(resposta){
					req.body.premio = apostador.valorpremio(req.body.valor, req.body.premio);
					req.body.comissao = apostador.valorcomissao(req.body.valor, req.body.comissao);
					req.body.admin = apostador.valoradmin(req.body.valor, req.body.admin);
					app.models.schemas.apostador.create(req.body, function(err, resposta){
							res.status(200).json(resposta);
					})	
				}else{
					res.status(403).json({ resposta : false, mensagem : 'Talvez você não esteja logado!'});
				}
			})
		},
		
		deletar : function(req, res){
			app.models.schemas.agentes.findOne({token : req.token}, function(err, resposta){
				if(err){
					res.status(500).json({resposta : false, mensagem : 'Houve algum problema tente novamente!', erro : err});
				}else if(resposta){
					app.models.schemas.apostador.findById(req.params.id).remove(function(err, resposta){			
							res.status(200).json({ resposta : true });
						})	
					}else{
					res.status(403).json({ resposta : false, mensagem : 'Talvez você não esteja logado!'});
				}
			})
		}
	}
}
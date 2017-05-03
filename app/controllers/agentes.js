module.exports = function(app){
	return {		
		registros : function(req, res){
			app.models.schemas.agentes.findOne({token : req.token}, function(err, resposta){
				if(err){
					res.status(500).json({resposta : false, mensagem : 'Houve algum problema tente novamente!', erro : err});
				}else if(resposta){
					app.models.schemas.agentes.find({}, function(err, resposta){
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
					res.status(500).json({resposta : false, mensagem : 'Houve algum problema tente novamente!', erro : err.error.errmsg });
				}else if(resposta){
					app.models.schemas.agentes.findById(req.params.id, function(err, resposta){
						res.status(200).json(resposta);
					})	
				}else{
					res.status(403).json({ resposta : false, mensagem : 'Talvez você não esteja logado!'});
				}
			})
		},
		
		cadastrar : function(req, res){
			app.models.schemas.agentes.findOne({token : req.token}, function(err, resposta){
				if(err){
					res.status(500).json({resposta : false, mensagem : 'Houve algum problema tente novamente!', erro : err.error.errmsg });
				}else if(resposta){
					var agentes = new app.models.schemas.agentes();
					req.body.token = agentes.gerartoken(req.body.nome);
					req.body.senha = agentes.criptografar(req.body.senha);					
					app.models.schemas.agentes.create(req.body, function(err, resposta){					
						if(err) res.status(500).json({ resposta : false , mensagem : 'Aconteceu algum erro tente novamente!', error : err });
						res.status(200).json(resposta);
					})
				}else{
					res.status(403).json({ resposta : false, mensagem : 'Talvez você não esteja logado!'});
				}
			})
		},
		
		alterar : function(req, res){
			app.models.schemas.agentes.findOne({token : req.token}, function(err, resposta){
				if(err){
					res.status(500).json({resposta : false, mensagem : 'Houve algum problema tente novamente!', erro : err.error.errmsg });
				}else if(resposta){
					app.models.schemas.agentes.findById(req.params.id, function(err, resposta){
						var agentes = new app.models.schemas.agentes();
						resposta.token = agentes.gerartoken(req.body.nome);
						resposta.senha = agentes.criptografar(req.body.senha);
						resposta.nome = req.body.nome;
						resposta.visivel = req.body.visivel;
						resposta.save(function(){
							res.status(200).json(resposta);
							});
					})
				}else{
					res.status(403).json({ resposta : false, mensagem : 'Talvez você não esteja logado!'});
				}
			})
		},
		
		deletar : function(req, res){
			app.models.schemas.agentes.findOne({token : req.token}, function(err, resposta){
				if(err){
					res.status(500).json({resposta : false, mensagem : 'Houve algum problema tente novamente!', erro : err.error.errmsg });
				}else if(resposta){
					app.models.schemas.agentes.remove({_id : req.params.id }, function(err, resposta){					
						res.status(200).json(resposta);
					})	
				}else{
					res.status(403).json({ resposta : false, mensagem : 'Talvez você não esteja logado!'});
				}
			})
		}
	}
}
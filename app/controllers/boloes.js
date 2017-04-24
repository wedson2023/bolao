module.exports = function(app){	
	return {
		registros : function(req, res){
			app.models.schemas.agentes.findOne({token : req.token}, function(err, resposta){
				if(err){
					res.status(500).json({resposta : false, mensagem : 'Houve algum problema tente novamente!', erro : err});
				}else if(resposta){
					app.models.schemas.boloes.find({}, function(err, resposta){
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
					app.models.schemas.boloes.findById(req.params.id, function(err, resposta){
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
					res.status(500).json({resposta : false, mensagem : 'Houve algum problema tente novamente!', erro : err});
				}else if(resposta){
					app.models.schemas.boloes.create(req.body, function(err, resposta){
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
					res.status(500).json({resposta : false, mensagem : 'Houve algum problema tente novamente!', erro : err});
				}else if(resposta){
					app.models.schemas.boloes.findById(req.params.id, function(err, resposta){
						//resposta.nome = req.body.nome;
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
					res.status(500).json({resposta : false, mensagem : 'Houve algum problema tente novamente!', erro : err});
				}else if(resposta){
					app.models.schemas.boloes.remove({_id : req.params.id }, function(err, resposta){					
						res.status(200).json(resposta);
					})
				}else{
					res.status(403).json({ resposta : false, mensagem : 'Talvez você não esteja logado!'});
				}
			})	
		}
	}
}
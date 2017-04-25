module.exports = function(app){	
	var url = require('url');
	return {
		registros : function(req, res){	
			app.models.schemas.agentes.findOne({token : req.token}, function(err, resposta){
				if(err){
					res.status(500).json({resposta : false, mensagem : 'Houve algum problema tente novamente!', erro : err});
				}else if(resposta){
					app.models.schemas.boloes.findById(req.params.id, function(err, resposta){							
							res.status(200).json(resposta.confrontos);
						})
				}else{
					res.status(403).json({ resposta : false, mensagem : 'Talvez você não esteja logado!'});
				}
			})
		},
		
		registro : function(req, res){
			var uri = url.parse(req.url, true);
			app.models.schemas.agentes.findOne({token : req.token}, function(err, resposta){
				if(err){
					res.status(500).json({resposta : false, mensagem : 'Houve algum problema tente novamente!', erro : err});
				}else if(resposta){
					app.models.schemas.boloes.findById(req.params.id, function(err, resposta){
						res.status(200).json(resposta.confrontos.id(uri.query.id));
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
					app.models.schemas.boloes.findById(req.params.id, function(err, resposta){						
							resposta.confrontos.push(req.body);
							resposta.save(function(err, resposta){
								res.status(200).json(resposta);
								})
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
							var confrontos = resposta.confrontos.id(req.body.id);
							confrontos.casa = req.body.casa;
							confrontos.horario = req.body.horario;
							resposta.save(function(err, resposta){
								res.status(200).json(resposta);
								})
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
					app.models.schemas.boloes.findById(req.params.id, function(err, resposta){		
							resposta.confrontos.id(req.body.id).remove();
							resposta.save(function(err, resposta){
								res.status(200).json(resposta);
								})						
						})
				}else{
					res.status(403).json({ resposta : false, mensagem : 'Talvez você não esteja logado!'});
				}
			})
		}
	}
}
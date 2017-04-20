module.exports = function(app){	
	var url = require('url');
	return {
		registros : function(req, res){
			app.models.schemas.agentes.findOne({token : req.token}, function(err, resposta){
				if(err){
					res.status(500).json({resposta : false, mensagem : 'Houve algum problema tente novamente!', erro : err});
				}else if(resposta){
					app.models.schemas.agentes.findById(req.params.id, function(err, resposta){							
							res.status(200).json(resposta.apostador);
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
					app.models.schemas.agentes.findById(req.params.id, function(err, resposta){						
						res.status(200).json(resposta.apostador.id(uri.query.id));
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
					app.models.schemas.agentes.findById(req.params.id, function(err, resposta){						
							resposta.apostador.push(req.body);
							resposta.save(function(){
								res.status(200).json(resposta);
								})
					})	
				}else{
					res.status(403).json({ resposta : false, mensagem : 'Talvez você não esteja logado!'});
				}
			})
		},
		
		deletar : function(req, res){
			var uri = url.parse(req.url, true);
			app.models.schemas.agentes.findOne({token : req.token}, function(err, resposta){
				if(err){
					res.status(500).json({resposta : false, mensagem : 'Houve algum problema tente novamente!', erro : err});
				}else if(resposta){
					app.models.schemas.agentes.findById(req.params.id, function(err, resposta){			
							resposta.apostador.id(uri.query.id).remove();
							resposta.save(function(){
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
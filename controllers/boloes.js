module.exports = function(app){	
	return {
		registros : function(req, res){	
				app.models.schemas.boloes.find({}, function(err, resposta){
					res.status(200).json(resposta);
				})				
		},
		
		registro : function(req, res){	
				app.models.schemas.boloes.findById(req.params.id, function(err, resposta){
					res.status(200).json(resposta);
				})			
		},
		
		cadastrar : function(req, res){	
				app.models.schemas.boloes.create(req.body, function(err, resposta){
					res.status(200).json(resposta);
				})			
		},
		
		alterar : function(req, res){	
				app.models.schemas.boloes.findById(req.params.id, function(err, resposta){
					resposta.nome = req.body.nome;
					resposta.save(function(){
						res.status(200).json(resposta);
						});
				})			
		},
		
		deletar : function(req, res){	
				app.models.schemas.boloes.remove({_id : req.params.id }, function(err, resposta){					
					res.status(200).json(resposta);
				})			
		}
	}
}
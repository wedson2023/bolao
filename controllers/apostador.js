module.exports = function(app){	
	return {
		registros : function(req, res){	
				app.models.schemas.agentes.findById(req.params.id, function(err, resposta){							
						res.status(200).json(resposta.apostador);
					})					
		},
		
		registro : function(req, res){	
				app.models.schemas.agentes.findById(req.params.id, function(err, resposta){
					var id = "58f00d332c5e1f15d4c9f778";
					res.status(200).json(resposta.apostador.id(id));
				})			
		},
		
		cadastrar : function(req, res){
				app.models.schemas.agentes.findById(req.params.id, function(err, resposta){						
						resposta.apostador.push(req.body);
						resposta.save(function(){
							res.status(200).json(resposta);
							})
					})		
		},
		
		deletar : function(req, res){	
				app.models.schemas.agentes.findById(req.params.id, function(err, resposta){	
						var id = "58f00d332c5e1f15d4c9f778";										
						resposta.apostador.id(id).remove();
						resposta.save(function(){
							res.status(200).json(resposta);
							})						
					})				
		}
	}
}
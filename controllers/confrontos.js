module.exports = function(app){	
	var url = require('url');
	return {
		registros : function(req, res){	
				app.models.schemas.boloes.findById(req.params.id, function(err, resposta){							
						res.status(200).json(resposta.confrontos);
					})					
		},
		
		registro : function(req, res){
				var uri = url.parse(req.url, true);
				app.models.schemas.boloes.findById(req.params.id, function(err, resposta){
					res.status(200).json(resposta.confrontos.id(uri.query.id));
				})			
		},
		
		cadastrar : function(req, res){
				app.models.schemas.boloes.findById(req.params.id, function(err, resposta){						
						resposta.confrontos.push(req.body);
						resposta.save(function(){
							res.status(200).json(resposta);
							})
					})		
		},
		
		alterar : function(req, res){
				app.models.schemas.boloes.findById(req.params.id, function(err, resposta){						
						var confrontos = resposta.confrontos.id(req.body.id);
						confrontos.casa = req.body.casa;
						resposta.save(function(){
							res.status(200).json(confrontos);
							})
					})		
		},
		
		deletar : function(req, res){	
				app.models.schemas.boloes.findById(req.params.id, function(err, resposta){		
						resposta.confrontos.id(req.body.id).remove();
						resposta.save(function(){
							res.status(200).json(resposta);
							})						
					})				
		}
	}
}
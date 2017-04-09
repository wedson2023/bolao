module.exports = function(app){	
	return {
		entrar : function(req, res){		
				app.models.schemas.agentes.find({}, function(err, resposta){
					res.json(resposta);
				})				
		},
		
		sair : function(req, res){		
				//app.models.schemas.agentes.find({}, function(err, resposta){
					res.json({ resposta : 'sair' });
				//})				
		} 
	}
}
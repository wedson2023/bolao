module.exports = function(app){	
	return {
		pesquisar : function(req, res){	
				app.models.schemas.boloes.find({}, function(err, resposta){
					res.status(200).json(resposta);
				})				
		} 
	}
}
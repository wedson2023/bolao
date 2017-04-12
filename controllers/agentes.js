module.exports = function(app){	
	return {
		listar : function(req, res){	
				app.models.schemas.agentes.find({}, function(err, resposta){
					res.status(200).json(resposta);
				})				
		} 
	}
}
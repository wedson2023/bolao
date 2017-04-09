module.exports = function(app){	
	return function(req, res){		
		app.models.schemas.agentes.find({}, function(err, resposta){
			res.json(resposta);
		})
	}
}
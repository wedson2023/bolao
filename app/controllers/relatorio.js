module.exports = function(app){
	return {		
		registros : function(req, res){
			app.models.schemas.agentes.findOne({token : req.token}, function(err, resposta){
				app.models.schemas.apostador.find({}, function(err, resposta){
					res.status(200).json(resposta);
				})
				
			})
		},
		
		registro : function(req, res){
			app.models.schemas.agentes.findOne({token : req.token}, function(err, resposta){
				
			})
		}
	}
}


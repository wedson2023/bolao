module.exports = function(app){	
	var url = require('url');
	return {		
		registros : function(req, res){
			var agente= url.parse(req.url, true).query.agente;
			var nivel = parseInt(url.parse(req.url, true).query.nivel);
			
			if(nivel){
				var query = { $and : [ { bolao : req.params.id}, { agente : agente } ] };
			}else{
				var query = { bolao : req.params.id };
			}
			
			app.models.schemas.apostador.find(query, function(err, resposta){							
					res.status(200).json(resposta);
				})
				
			}
		}
	}
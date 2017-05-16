module.exports = function(app){	
	var url = require('url');
	return {		
		registros : function(req, res){
			var agente= url.parse(req.url, true).query.agente;
			var nivel = parseInt(url.parse(req.url, true).query.nivel);
						
			app.models.schemas.apostador.find({ $and : [ { bolao : req.params.id}, { agente : agente } ] }, function(err, resposta){
					app.models.schemas.apostador.find({ bolao : req.params.id }, function(err, response){							
						res.status(200).json({ 'usuario' : resposta, 'bolao' : response});
					})
				})
				
			}
		}
	}
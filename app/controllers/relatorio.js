module.exports = function(app){
	var url = require('url');
	return {		
		registros : function(req, res){
			app.models.schemas.agentes.findOne({token : req.token}, function(err, resposta){
				app.models.schemas.apostador.find({}, function(err, resposta){
					res.status(200).json(resposta);
				})
				
			})
		},
		
		data : function(req, res){
			app.models.schemas.agentes.findOne({token : req.token}, function(err, resposta){
				var data = new Date();
				res.status(200).json(data);
			})
		},
		
		listar : function(req, res){
			var first = url.parse(req.url, true).query.first;	
			var last = url.parse(req.url, true).query.last;
			var bolao = url.parse(req.url, true).query.bolao;
			var nivel = parseInt(url.parse(req.url, true).query.nivel);
			var agente = url.parse(req.url, true).query.agente;
			
			if(first != 'null' && bolao != 'undefined'){
				if(nivel){
					var query = { $and : [ { data : { $gte : first } }, { data : { $lte : last } }, { bolao : { $eq : bolao } }, { agente : agente } ] };
				}else{
					var query = { $and : [ { data : { $gte : first } }, { data : { $lte : last } }, { bolao : { $eq : bolao } } ] };
				}				
			}else if(first != 'null' && first == last){
				var query = { data : { $eq : first } };
			}else if(first != 'null'){
				if(nivel){
					var query = { $and : [ { data : { $gte : first } }, { data : { $lte : last } }, { agente : agente } ] };
				}else{
					var query = { $and : [ { data : { $gte : first } }, { data : { $lte : last } } ] };	
				}				
			}else{
				if(nivel){
					var query = { $and : [{ bolao : { $eq : bolao } }, { agente : agente }] };
				}else{
					var query = { bolao : { $eq : bolao } };
				}				
			}
			
			app.models.schemas.agentes.findOne({token : req.token}, function(err, resposta){
				if(resposta){
					app.models.schemas.apostador.find(query, function(err, resposta){
						res.status(200).json(resposta);
					})
				}
			})
		}
	}
}


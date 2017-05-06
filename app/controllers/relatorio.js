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
		
		listar : function(req, res){
			var first = url.parse(req.url, true).query.first;	
			var last = url.parse(req.url, true).query.last;
			var bolao = url.parse(req.url, true).query.bolao;
			
			var data = new Date();
			
			if(first != 'null' && bolao != 'undefined'){
				var query = { $and : [ { horario : { $gt : first } }, { horario : { $lte : last } }, { bolao : { $eq : bolao } } ] };
			}else if(first == last){
				// parei aqui 
				//var query = { $and : [ { horario : { $gt : '2017-05-05 00:00:00' } }, { horario : { $lte : '2017-05-06 00:00:00' } }]}				
			}else if(first != 'null'){
				var query = { $and : [ { horario : { $gt : first } }, { horario : { $lte : last } } ] };
			}else{
				var query = { bolao : { $eq : bolao } };
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


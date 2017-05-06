module.exports = function(app){	
	var url = require('url');
	return {		
		registros : function(req, res){
			/*var limite = parseInt(url.parse(req.url, true).query.limite);
			var bolao = url.parse(req.url, true).query.bolao;
			var agente= url.parse(req.url, true).query.agente;*/			
			app.models.schemas.agentes.findOne({ token : req.token }, '_id', function(err, respostas){
				if(err){
					res.status(500).json({resposta : false, mensagem : 'Houve algum problema tente novamente!', erro : err});
				}else if(respostas){
					app.models.schemas.apostador.find({ bolao : req.params.id}, function(err, resposta){							
							res.status(200).json(resposta);
						})
				}else{
					res.status(403).json({ resposta : false, mensagem : 'Talvez você não esteja logado!'});
				}
			})
		}
		}
	}
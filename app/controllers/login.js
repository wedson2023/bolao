module.exports = function(app){	
	return {
		entrar : function(req, res){
				var agentes = new app.models.schemas.agentes();
				app.models.schemas.agentes.findOne({ nome : req.body.nome }, function(err, resposta){
					if(resposta){
						agentes.comparar(req.body.senha, resposta.senha, function(err, comparar){							
							if(comparar){
								req.session.usuarios = req.body;
								res.status(200).json({ resposta : resposta , mensagem : 'Acesso Permitido'});	
							}else{
								res.status(200).json({ resposta : false , mensagem : 'Login ou senha incorretos'});													   
							}
						});
					}else{
						res.status(200).json({esposta : false , mensagem : 'Nome de agente não encontrado!'});
					}
				})				
		},
		
		sair : function(req, res){
			req.session.destroy(function(){
				res.json({ resposta : true });
				});		
		} 
	}
}
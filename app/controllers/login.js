module.exports = function(app){	
	return {
		entrar : function(req, res){
				var agentes = new app.models.schemas.agentes();
				app.models.schemas.agentes.findOne({ nome : req.body.nome }, '_id token nivel visivel nome senha', function(err, resposta){
					if(resposta){
						agentes.comparar(req.body.senha, resposta.senha, function(err, comparar){							
							if(comparar){
								req.session.usuarios = req.body;
								delete resposta.senha;
								res.status(200).json({ resposta : resposta , mensagem : 'Acesso Permitido'});	
							}else{
								res.status(200).json({ resposta : false , mensagem : 'Senha esta incorreta tente novamente'});													   
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
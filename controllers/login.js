module.exports = function(app){	
	return {
		entrar : function(req, res){
				app.models.schemas.agentes.findOne({ nome : req.body.nome, senha : req.body.senha }, function(err, resposta){					
					if(err){
						res.status(500).json({ resposta : false , mensagem : 'Aconteceu algum erro tente novamente!', error : err });
					}else if(resp.nome == req.body.nome && resp.senha == req.body.senha){
						req.session.usuarios = req.body;
						res.status(200).json({ resposta : true , mensagem : 'Acesso Permitido'});
					}else{
						res.status(200).json({ resposta : false , mensagem : 'Login ou senha incorretos'});
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
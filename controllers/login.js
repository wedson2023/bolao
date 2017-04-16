module.exports = function(app){	
	return {
		entrar : function(req, res){
				app.models.schemas.agentes.find({ nome : req.body.nome }, function(err, resp){
					var resp = resp[0];
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
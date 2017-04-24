app.controller('loginCtrl', ['config', 'agentes', 'http', '$window', 'sessoes', 'mensagem', function(config, agentes, http, $window, sessoes, mensagem){
	
	var self = this;	
	self.agentes = agentes;	
	self.acessar = function(agentes){
		http('POST', config.host + '/entrar', agentes).then(function(response){	
			if(response.data.resposta){
				sessoes(response.data.resposta);
				$window.location.href = '#/home';
				}
		}, function(err){
			mensagem('Mensagem de alerta', 'Erro ao conectar. <br>/n Cod. Erro : ' + err);
		})		
	}
}])
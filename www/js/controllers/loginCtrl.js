app.controller('loginCtrl', function(config, agentes, http, $window, sessoes){
	
	var self = this;	
	self.agentes = agentes;	
	
	self.acessar = function(agentes){
		http.acessar('POST', config.host + '/entrar', agentes).then(function(response){			
			if(response.data.resposta){
				sessoes(response.data.resposta);
				$window.location.href = '#/home';
				}
		}, function(err){
			console.log(err)
		})
	}
})
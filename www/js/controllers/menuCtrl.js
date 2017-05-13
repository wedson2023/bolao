app.controller('menuCtrl', function($ionicSideMenuDelegate, config, http, session){
	
	var self = this;		
	self.empresa = config.empresa;
	self.agente = session.nome;
	self.nivel = session.nivel;
	
	self.openmenu = function() {
    	$ionicSideMenuDelegate.toggleLeft();
	};
	
	self.sair = function(){		
		http('GET', config.host + '/sair', null, { token : session.token }).then(function(response){
			window.location.href = '#/login';
			sessionStorage.clear();
		})
	}
})
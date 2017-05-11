app.controller('menuCtrl', function($ionicSideMenuDelegate, config, http){
	
	var self = this;		
	self.empresa = config.empresa;
	self.agente = config.nome;
	self.nivel = config.nivel;
	
	self.openmenu = function() {
    	$ionicSideMenuDelegate.toggleLeft();
	};
	
	self.sair = function(){		
		http('GET', config.host + '/sair', null, { token : config.token }).then(function(response){
			window.location.href = '#/login';
			sessionStorage.clear();
		})
	}
	
	self.carregar = function(){
		location.reload();
	}
})
app.controller('menuCtrl', function($ionicSideMenuDelegate, config){
	
	var self = this;		
	self.empresa = config.empresa;
	
	self.openmenu = function() {
    	$ionicSideMenuDelegate.toggleLeft();
	};
	
	self.agente = config.nome;
})
app.controller('loginCtrl', ['config', '$timeout', 'agentes', 'http', '$window', 'sessoes', 'mensagem', '$ionicLoading', function(config, $timeout, agentes, http, $window, sessoes, mensagem, $ionicLoading){
	
	var self = this;	
	self.agentes = agentes;	
	self.acessar = function(agentes){
		$ionicLoading.show({ template: 'Aguarde ...', duration: 5000 });
		http('POST', config.host + '/entrar', agentes).then(function(response){	
			if(response.data.resposta){
				sessoes(response.data.resposta);
				$window.location.href = '#/menu/home';
				$timeout(function(){
					location.reload();
				}, 300)				
				$ionicLoading.hide();
				}else{
					$ionicLoading.hide();
					mensagem('Mensagem de alerta', response.data.mensagem);
				}
		}, function(err){
			$ionicLoading.hide();
			mensagem('Mensagem de alerta', 'Erro ao conectar. Cod. Erro : ' + err.data);
		})	
	}
}])
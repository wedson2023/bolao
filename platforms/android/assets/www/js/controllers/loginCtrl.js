app.controller('loginCtrl', ['config', '$timeout', 'agentes', 'http', '$window', 'sessoes', 'mensagem', '$ionicLoading', function(config, $timeout, agentes, http, $window, sessoes, mensagem, $ionicLoading){
	
	var self = this;	
	self.agentes = agentes;	
	self.acessar = function(agentes){
		agentes.nome = agentes.nome.toLowerCase();
		$ionicLoading.show({ template: 'Aguarde ...', duration: 5000 });
		http('POST', config.host + '/entrar', agentes).then(function(response){	
			if(response.data.resposta){
				sessoes(response.data.resposta);
				$ionicLoading.hide();
				$window.location.href = '#/menu/home';
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
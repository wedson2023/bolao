app

.controller('bolaoCtrl', ['http', 'config', 'mensagem', '$stateParams', '$ionicLoading', '$filter', '$ionicModal', '$scope', 'confrontos', function(http, config, mensagem, $stateParams, $ionicLoading, $filter, $ionicModal, $scope, confrontos){
	
	var self = this;
	self.titulo = 'Bolão';
	
	$ionicLoading.show({ template: 'Aguarde ...', duration: 5000 });
	http('GET', config.host + /boloes/ + $stateParams.id, null, { token : config.token }).then(function(response){
		$ionicLoading.hide();
		self.bolao = response.data;	
		var horario = response.data.confrontos.sort(function(a, b){ return a.horario > b.horario; })
		self.horario = { abertura :horario[0].horario, fechamento : horario[horario.length - 1].horario };		
		self.confrontos = confrontos(response.data);
	 }, function(err){
		$ionicLoading.hide();
		mensagem('Mensagem de alerta', response.data.mensagem);
	})
	
	
	
	self.cadastrar = function(confronto){
		console.log(confronto);
		http('POST', config.host + /apostador/ + config._id, confronto, { token : config.token }).then(function(response){			
			if(response){
				self.confrontos.nome = null;
				self.confrontos.apostas = [];
				mensagem('Mensagem de sucesso', 'Cadastro realizado com sucesso!');
			}
		}, function(err){
			mensagem('Mensagem de sucesso', 'Cadastro realizado com sucesso! Erro: ' + err.data);
		})
	}
	
			
	$ionicModal.fromTemplateUrl('content/cadastrar-aposta.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.modal = modal;
	})
		
	self.abrirmodal = function(){		
		$scope.modal.show();  	
	}
	
	self.fecharmodal = function(){		
		$scope.modal.hide();  	
	}
	
	
}])
app

.controller('bolaoCtrl', ['http', 'config', 'mensagem', '$stateParams', '$ionicLoading', '$filter', '$ionicModal', '$scope', 'apostador', '$ionicListDelegate', '$ionicPopup', function(http, config, mensagem, $stateParams, $ionicLoading, $filter, $ionicModal, $scope, apostador, $ionicListDelegate, $ionicPopup){
	
	var self = this;
	self.titulo = 'Bolão';
	
	$ionicLoading.show({ template: 'Aguarde ...', duration: 5000 });
	http('GET', config.host + /boloes/ + $stateParams.id, null, { token : config.token }).then(function(response){
		$ionicLoading.hide();
		self.bolao = response.data;	
		var horario = response.data.confrontos.sort(function(a, b){ return a.horario > b.horario; })
		self.horario = { abertura :horario[0].horario, fechamento : horario[horario.length - 1].horario };		
		self.apostador = apostador(response.data);
	 }, function(err){
		$ionicLoading.hide();
		mensagem('Mensagem de alerta', response.data.mensagem);
	})	
	
	self.cadastrar = function(apostador){
		console.log(apostador)
		http('POST', config.host + '/apostador/' , apostador, { token : config.token }).then(function(response){
			console.log(response.data)
			if(response){
				self.apostador.nome = null;
				self.apostador.apostas = [];
				
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
		$scope.cadastro = modal;
	})
		
	self.abrirmodalcadastro = function(){		
		$scope.cadastro.show();  	
	}
	
	self.fecharmodalcadastro = function(){		
		$scope.cadastro.hide();  	
	}
	
	$ionicModal.fromTemplateUrl('content/listar-clientes.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.clientes = modal;
	})
		
	self.abrirmodalclientes = function(){		
		$ionicLoading.show({ template: 'Aguarde ...', duration: 5000 });
		http('GET', config.host + '/apostador?limite=100', null, { token : config.token }).then(function(response){			
			$ionicLoading.hide();
			if(response){
				self.clientes = response.data;
				}
		}, function(err){
			mensagem('Mensagem de alerta', 'Erro ao listar clientes. Erro: ' + err.data);
		})
		$scope.clientes.show();  	
	}
	
	self.fecharmodalclientes = function(){			
		$scope.clientes.hide();  	
	}
	
	self.showdelete = function() {
		if($ionicListDelegate.showDelete()){
			$ionicListDelegate.showDelete(false);
		}else{
			$ionicListDelegate.showDelete(true);
		}    	
	};	
	
	self.cancelar = true;
	self.loadmore = function(){
		var total = self.clientes.length;
		var limite = total + 100;		
		http('GET', config.host + '/apostador?limite=' + limite, null, { token : config.token }).then(function(response){
			self.cancelar = total == response.data.length ? false : true;
			if(response) self.clientes = response.data;						
		}, function(err){
			mensagem('Mensagem de alerta', 'Erro ao listar clientes. Erro: ' + err.data);
		})		
	}
	
	self.deletar = function(cliente){
		$ionicPopup.confirm({
			title : 'Confirme',
			template : 'Tem certeza que deseja excluir o cliente ' + cliente.nome.toUpperCase() + ' ?'
		}).then(function(res){
			 if(res){
				http('DELETE', config.host + '/apostador/' + cliente._id, null, { token : config.token }).then(function(response){
					if(response.data.resposta){
						self.clientes.splice(self.clientes.indexOf(cliente), 1);
					}else{
						mensagem('Mensagem Alerta', 'Erro ao excluir cliente.')
					}
				})				 
			 }
		})
	}
	
}])
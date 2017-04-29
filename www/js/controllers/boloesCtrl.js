app

.controller('boloesCtrl', ['$scope', 'http', 'config', 'boloes', 'mensagem', '$ionicPopup', '$ionicModal', '$ionicLoading', 'bolao', function($scope, http, config, boloes, mensagem, $ionicPopup, $ionicModal, $ionicLoading, bolao){
	
	var self = this;	
	self.titulo = 'Gerenciar bolões';	
	self.boloes = boloes.data;		
	
	console.log(bolao)
	
	self.deletar = function(boloes){
		$ionicPopup.confirm({
			title : 'Confirme',
			template : 'Tem certeza que deseja excluir o bolão ' + boloes.nome.toUpperCase() + '?'
		}).then(function(res){
			 if(res){
				http('DELETE', config.host + '/boloes/' + boloes._id, null, { token : config.token }).then(function(response){
					if(response.data.resposta){
						self.boloes.splice(self.boloes.indexOf(boloes), 1);
					}
				})				 
			 }
		})
	}
	
	self.cancelar = true;
	self.loadmore = function(){
		var total = self.boloes.length;
		var limite = total + 100;		
		http('GET', config.host + '/boloes?limite=' + limite, null, { token : config.token }).then(function(response){
			self.cancelar = total == response.data.length ? false : true;
			if(response) self.boloes = response.data;						
		}, function(err){
			mensagem('Mensagem de alerta', 'Erro ao listar clientes. Erro: ' + err.data);
		})		
	}
	
	$ionicModal.fromTemplateUrl('content/cadastrar-boloes.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.boloes = modal;
	})
	
	self.fecharmodalclientes = function(){			
		$scope.boloes.hide();  	
	}
	
	self.bolao = bolao;
	self.showmodalcadastro = function(){
		$ionicLoading.show({ template: 'Aguarde ...', duration: 5000 });
		
		http('GET', 'times.json').then(function(response){			
			$ionicLoading.hide();
			self.times = response.data;
		}, function(err){
			mensagem('Mensagem de alerta', 'Erro ao listar clientes. Erro: ' + err.data);
		})
		$scope.boloes.show();  
	}
	
	var id = 5;
	self.moreteam = function(){
		id++;
		var confrontos = { id : id, horario : null, casa : null, fora : null, pcasa : null, pfora : null };		
		self.bolao.confrontos.push(confrontos);		
		console.log(self.bolao.confrontos)
	}
	
	self.deleteteam = function(confrontos){
		console.log(confrontos)
		self.bolao.confrontos.splice(self.bolao.confrontos.indexOf(confrontos), 1);
	}
	
}])
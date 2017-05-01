app

.controller('boloesCtrl', ['$scope', 'http', 'config', 'boloes', 'mensagem', '$ionicPopup', '$ionicModal', '$ionicLoading', 'bolao', function($scope, http, config, boloes, mensagem, $ionicPopup, $ionicModal, $ionicLoading, bolao){
	
	var self = this;	
	self.titulo = 'Gerenciar bolões';	
	self.boloes = boloes.data;	
	
	self.deletar = function(boloes){
		$ionicPopup.confirm({
			title : 'Confirme',
			template : 'Tem certeza que deseja excluir o bolão ' + boloes.nome.toUpperCase() + ', isso irá apagar todos apostador do mesmo ?'
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
			mensagem('Mensagem alerta', 'Verifique sua conexão com a internet ou tente novamente');
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
	
	self.showmodalcadastro = function(dados){
		$ionicLoading.show({ template: 'Aguarde ...', duration: 5000 });
		
		http('GET', 'times.json').then(function(response){			
			$ionicLoading.hide();
			self.times = response.data;
		}, function(err){
			mensagem('Mensagem alerta', 'Verifique sua conexão com a internet ou tente novamente');
		})
		$scope.boloes.show(); 
		console.log(dados)
		
		self.bolao = dados ? dados : bolao;
	}
	
	var id = 5;
	self.moreteam = function(){
		id++;
		var confrontos = { id : id, horario : null, casa : null, fora : null, pcasa : null, pfora : null };		
		self.bolao.confrontos.push(confrontos);		
		console.log(self.bolao.confrontos)
	}
	
	self.addlugares = function(confrontos){
		var total = parseInt(self.bolao.lugares.length);
		total++		
		if(total <= 10){			
			self.bolao.lugares.push(total);
		}
	}
	
	self.deleteteam = function(confrontos){
		if(self.bolao.confrontos.length > 1){
			self.bolao.confrontos.splice(self.bolao.confrontos.indexOf(confrontos), 1);
		}
	}
	
	self.deletelugar = function(){
		if(self.bolao.lugares.length != 1) self.bolao.lugares.pop();		
	}
	
	self.cadastrar = function(dados){		
		var porcentagem = self.bolao.porcentagem.reduce(function(prev, cur){ return prev + cur; }, 0);
		if(porcentagem != 100){
			mensagem('Mensagem alerta', 'A soma dos campos de porcentagem tem que ser igual a 100, Você colocou ' + porcentagem + ' por cento');
		}else{
			console.log(dados)
			if(dados._id){
				http('PUT', config.host + '/boloes/' + dados._id, dados, { token : config.token }).then(function(response){
					console.log(response.data)
					if(response.data.resposta){						
						self.boloes.push(response.data.resposta);
						mensagem('Mensagem sucesso', 'Cadastro alterado com sucesso.');	
						}
				}, function(err){
					mensagem('Mensagem alerta', 'Verifique sua conexão com a internet ou tente novamente');
				})
			}else{
				http('POST', config.host + '/boloes', dados, { token : config.token }).then(function(response){
					if(response.data.resposta){
						self.bolao.nome = null;
						self.bolao.valor = null;
						self.bolao.confrontos = [
							{id : 1, horario : null, casa : null, fora : null, pcasa : null, pfora : null },
							{id : 2, horario : null, casa : null, fora : null, pcasa : null, pfora : null },
							{id : 3, horario : null, casa : null, fora : null, pcasa : null, pfora : null },
							{id : 4, horario : null, casa : null, fora : null, pcasa : null, pfora : null },
							{id : 5, horario : null, casa : null, fora : null, pcasa : null, pfora : null }
						];
						self.bolao.lugares = [1, 2, 3];
						self.boloes.push(response.data.resposta);
						mensagem('Mensagem sucesso', 'Cadastro realizado com sucesso.');
					}
				}, function(err){
					mensagem('Mensagem alerta', 'Verifique sua conexão com a internet ou tente novamente');
				})
			}
			
		}
		
	}
}])
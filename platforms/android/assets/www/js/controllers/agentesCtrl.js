app

.controller('agentesCtrl', ['$scope', 'config', 'http', 'agentes', 'mensagem', '$ionicPopup', '$ionicModal', 'session', function($scope, config, http, agentes, mensagem, $ionicPopup, $ionicModal, session){
	
	var self = this;	
	self.titulo = 'Gerenciar agentes';
	self.agentes = agentes.data;
	self.agente = { nome : null,  senha : null, visivel : null};
	
	self.deletar = function(agentes){	
		if(agentes.nivel == 0){ mensagem('Mensagem Alerta', 'Não é possível excluir o admin.'); return false; }
		$ionicPopup.confirm({
			title : 'Confirme',
			template : 'Tem certeza que deseja excluir o agentes ' + agentes.nome.toUpperCase() + ', isso irá apagar todos apostador do mesmo ?'
		}).then(function(res){
			 if(res){
				http('DELETE', config.host + '/agentes/' + agentes._id, null, { token : session.token }).then(function(response){
					console.log(response)
					if(response.data){
						self.agentes.splice(self.agentes.indexOf(agentes), 1);
					}
				})				 
			 }
		})
	}
	
	self.cancelar = true;
	self.loadmore = function(){
		var total = self.agentes.length;
		var limite = total + 100;		
		http('GET', config.host + '/agentes?limite=' + limite, null, { token : session.token }).then(function(response){	
			console.log(response)
			self.cancelar = total == response.data.length ? false : true;
			if(response) self.agentes = response.data;						
		}, function(err){
			mensagem('Mensagem alerta', 'Verifique sua conexão com a internet ou tente novamente');
		})		
	}
	
	$ionicModal.fromTemplateUrl('content/cadastrar-agentes.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.agentes = modal;
	})
	
	self.fecharmodalcadastro = function(){			
		$scope.agentes.hide();  	
	}	
	
	self.showmodalcadastro = function(dados){
		$scope.agentes.show(); 		
		self.agente = dados ? dados : self.agente;
		self.agente.senha = null;
		console.log(self.agente)
		
	}
	
	self.cadastrar = function(dados){
		dados.nome = dados.nome.toLowerCase();
		if(dados._id){			
			http('PUT', config.host + '/agentes/' + dados._id, dados, { token : session.token }).then(function(response){
				if(response.data){
					if(session._id == response.data._id){ 
						session.token = response.data.token;
						sessionStorage.setItem('token', response.data.token);
						}
					mensagem('Mensagem sucesso', 'Cadastro alterado com sucesso.');	
					}
			}, function(err){
				mensagem('Mensagem alerta', 'Verifique sua conexão com a internet ou tente novamente');
			})
		}else{
			http('POST', config.host + '/agentes', dados, { token : session.token }).then(function(response){				
				if(response.data){
					angular.element(document.getElementById('nome')).val('');
					angular.element(document.getElementById('senha')).val('');
					self.agentes.push(response.data);
					mensagem('Mensagem sucesso', 'Cadastro realizado com sucesso.');
				}
			}, function(err){
				mensagem('Mensagem alerta', 'Verifique sua conexão com a internet ou tente novamente');
			})
		}
	}
	
}])
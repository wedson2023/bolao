app

.controller('bolaoCtrl', ['http', 'tabela', 'config', 'mensagem', '$stateParams', '$ionicLoading', '$filter', '$ionicModal', '$scope', 'apostador', '$ionicListDelegate', '$ionicPopup', 'session', 'comprovante', '$timeout', function(http, tabela, config, mensagem, $stateParams, $ionicLoading, $filter, $ionicModal, $scope, apostador, $ionicListDelegate, $ionicPopup, session, comprovante, $timeout){
	
	var self = this;
	self.titulo = 'Bolão';	
	self.nivel = session.nivel;
	
	bluetoothSerial.isEnabled(function(){
		bluetoothSerial.isConnected(null, function() {
			if(localStorage.getItem('id')){
				bluetoothSerial.connect(localStorage.getItem('id'));
			}else{
				mensagem('Mensagem Alerta', 'Por favor conecte-se a uma impressora.');
				window.location.href = '#/menu/impressora';
			}
		});
	},function(){
		bluetoothSerial.enable(function(){
			bluetoothSerial.isConnected(null, function() {
				if(localStorage.getItem('id')){
					bluetoothSerial.connect(localStorage.getItem('id'));
				}
			});			
		});
	});
		
	$ionicLoading.show({ template: 'Aguarde ...', duration: 5000 });
	http('GET', config.host + /boloes/ + $stateParams.id, null, { token : session.token }).then(function(response){
		$ionicLoading.hide();
		self.bolao = response.data;		
		
		var horario = response.data.confrontos.map(function(elemento){ return elemento.horario; });
		var horario = horario.sort(function(a, b){ return a > b; })	
		self.horario = { abertura :horario[0], fechamento : horario[horario.length - 1] };		
		self.apostador = apostador(response.data);
		
	 }, function(err){
		$ionicLoading.hide();
		mensagem('Mensagem de alerta', response.data.mensagem);
	})	
	
	self.cadastrar = function(apostador){
		
		bluetoothSerial.isEnabled(function(){
			apostador.premio = self.bolao.porcentagem[0];	
			apostador.comissao = self.bolao.porcentagem[1];	
			apostador.admin = self.bolao.porcentagem[2];
			apostador.nagente = session.nome;
			apostador.lugares = self.bolao.lugares;
			apostador.agente = session._id;
			
			http('GET', config.host + '/relatorio/data', null, { token : session.token }).then(function(response){			
				apostador.data = response.data.substr(0,10);

				if(response.data < self.horario.abertura){
					http('POST', config.host + '/apostador/' , apostador, { token : session.token }).then(function(response){
						if(response){
							response.data.lugares = self.bolao.lugares;
							response.data.hora = self.horario;
							bluetoothSerial.write(comprovante(response.data), function(){
								$ionicLoading.show({ template: 'Aguarde ...', duration: 5000 });								
							}, function(){								
								mensagem('Mensagem Alerta', 'Não foi possível emitir o comprovante tente emitir pela página dos apostadores.');
							});
							
							angular.element(document.getElementById('nome')).val('');
							for(x in apostador.apostas){
								angular.element(document.getElementById('casa_' + x)).val('');
								angular.element(document.getElementById('fora_' + x)).val('');
							}
							$timeout(function(){ mensagem('Mensagem de sucesso', 'Cadastro realizado com sucesso!'); }, 5000);							
						}
					}, function(err){
						mensagem('Mensagem de sucesso', 'Cadastro realizado com sucesso! Erro: ' + err.data);
					})				
				}else{
					$scope.cadastro.hide();  				
					mensagem('Mensagem alerta', 'Um dos jogos já iniciou, tente outro bolão.');
					window.location.href = '#/menu/home';
				}

			})
		}, function(){			
			bluetoothSerial.enable(function(){
				mensagem('Mensagem alerta', 'O bluetooth estava desligado tente agora.');
			})		
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
		http('GET', config.host + '/apostador?bolao=' + $stateParams.id + '&limite=100&agente=' + session._id + '&nivel=' + session.nivel, null, { token : session.token }).then(function(response){
			console.log(response.data);
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
		http('GET', config.host + '/apostador?bolao=' + $stateParams.id + '&limite=' + limite, null, { token : session.token }).then(function(response){
			console.log(response.data.length, total);
			self.cancelar = total == response.data.length ? true : false;
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
				http('DELETE', config.host + '/apostador/' + cliente._id, null, { token : session.token }).then(function(response){
					if(response.data.resposta){
						self.clientes.splice(self.clientes.indexOf(cliente), 1);
					}else{
						mensagem('Mensagem Alerta', 'Erro ao excluir cliente.')
					}
				})				 
			 }
		})
	}
	
	$ionicModal.fromTemplateUrl('content/ver-aposta.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.veraposta = modal;
	})
		
	self.abrirmodalveraposta = function(cliente){
		for(x in cliente.apostas){
			if(cliente.apostas[x]._id == self.bolao.confrontos[x]._id){
				cliente.apostas[x].casa = self.bolao.confrontos[x].casa;
				cliente.apostas[x].fora = self.bolao.confrontos[x].fora;
			}			
		}
		
		self.cliente = cliente.apostas;
		$scope.veraposta.show();	
	}
	
	self.fecharmodalveraposta = function(){			
		$scope.veraposta.hide();  	
	}
	
	self.tabela = function(){
		self.bolao.hora = self.horario;
		
		bluetoothSerial.isEnabled(function(){
			
			bluetoothSerial.isConnected(function(){	
				
				bluetoothSerial.write(tabela(self.bolao), function(){					
					$ionicLoading.show({ template: 'Aguarde ...', duration: 5000 });
				}, function(){
					$ionicLoading.hide();
					mensagem('Mensagem alerta', 'Nao foi possível enviar emitir a tabela tente novamente.');
				});
				
			}, function() {
				
			if(localStorage.getItem('id')){
				bluetoothSerial.connect(localStorage.getItem('id'), function(){
					
					bluetoothSerial.write(tabela(self.bolao), function(){
						$ionicLoading.show({ template: 'Aguarde ...', duration: 5000 });
					}, function(){
						$ionicLoading.hide();
						mensagem('Mensagem alerta', 'Nao foi possível enviar emitir a tabela tente novamente.');
					});
					
				});
				
			}else{
				$ionicLoading.hide();
				mensagem('Mensagem Alerta', 'Por favor conecte-se a uma impressora.');
				window.location.href = '#/menu/impressora';
			}
				
		});
			
		}, function(){
			$ionicLoading.hide();
			bluetoothSerial.enable(function(){
				mensagem('Mensagem alerta', 'O bluetooth estava desligado tente agora.');
			})
			
		})			
	}
	
	self.imprimir = function(clientes){
		clientes.hora = self.horario;
		clientes.lugares = self.bolao.lugares;	
		$ionicLoading.show({ template: 'Aguarde ...', duration: 5000 });
		bluetoothSerial.isEnabled(function(){
			bluetoothSerial.write(comprovante(clientes), null, function(){	
				$ionicLoading.hide();
				mensagem('Mensagem Alerta', 'Não foi possível emitir o comprovante tente emitir pela página dos apostadores.');
			});
		}, function(){
			$ionicLoading.hide();
			bluetoothSerial.enable(function(){
				mensagem('Mensagem alerta', 'O bluetooth estava desligado tente agora.');
			})
		})	
	}
	
}])
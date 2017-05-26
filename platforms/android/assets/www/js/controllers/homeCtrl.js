app

.controller('homeCtrl', ['config', 'http', 'mensagem', 'session', '$interval', '$ionicLoading', '$filter', '$scope', function(config, http, mensagem, session, $interval, $ionicLoading, $filter, $scope){
	
	var self = this;	
	self.titulo = 'Bolões';	
	self.boloes = [];
	
	$ionicLoading.show({ template: 'Aguarde ...', duration: 5000 });
	http('GET', config.host + '/boloes?visivel=0', null, { 'token' : session.token }).then(function(response){	
		http('GET', config.host + '/relatorio/data', null, { token : session.token }).then(function(resp){
				
				var cur = new Date(resp.data);

				for(x in response.data){				
					var horario = response.data[x].confrontos.sort(function(a, b){ return a.horario > b.horario; });
					var horario = new Date(horario[0].horario)
					
					http('GET', config.host + '/apostador?agente=' + session._id + '&nivel=0&bolao=' + response.data[x]._id, null, { 'token' : session.token }).then(function(total){
						response.data[x].acumulado = total.data.reduce(function(prev, cur){
							return prev + parseInt(cur.premio);
						}, 0);						
					});
					
					if(cur < horario){ self.boloes.push(response.data[x]); }
					}
		$scope.$broadcast('scroll.refreshComplete');			
		});
		$ionicLoading.hide();
	}, function(){
		mensagem('Mensagem Alerta', 'Não foi possível carregar os bolões verifique sua conexão com a internet.');
	})	
	
	self.refresh = function(){
		self.boloes = [];
		$ionicLoading.show({ template: 'Aguarde ...', duration: 5000 });
		http('GET', config.host + '/boloes?visivel=0', null, { 'token' : session.token }).then(function(response){	
			http('GET', config.host + '/relatorio/data', null, { token : session.token }).then(function(resp){
					
					var cur = new Date(resp.data);
	
					for(x in response.data){				
						var horario = response.data[x].confrontos.sort(function(a, b){ return a.horario > b.horario; });
						var horario = new Date(horario[0].horario)
						
						http('GET', config.host + '/apostador?agente=' + session._id + '&nivel=0&bolao=' + response.data[x]._id, null, { 'token' : session.token }).then(function(total){
							response.data[x].acumulado = total.data.reduce(function(prev, cur){
								return prev + parseInt(cur.premio);
							}, 0);						
						});
						
						if(cur < horario){ self.boloes.push(response.data[x]); }
						}
			$scope.$broadcast('scroll.refreshComplete');			
			});
			$ionicLoading.hide();
		}, function(){
			mensagem('Mensagem Alerta', 'Não foi possível carregar os bolões verifique sua conexão com a internet.');
		})	
		/*http('GET', config.host + '/boloes?visivel=0', null, { 'token' : session.token }).then(function(response){	
			http('GET', config.host + '/relatorio/data', null, { token : session.token }).then(function(resp){
				var cur = new Date(resp.data);

				for(x in response.data){				
					var horario = response.data[x].confrontos.sort(function(a, b){ return a.horario > b.horario; });
					var horario = new Date(horario[0].horario);
					
					http('GET', config.host + '/apostador?agente=' + session._id + '&nivel=' + session.nivel + '&bolao=' + response.data[x]._id, null, { 'token' : session.token }).then(function(total){
						response.data[x].acumulado = total.data.reduce(function(prev, cur){
							return prev + parseInt(cur.premio);
						}, 0);						
					});

					if(cur < horario){ self.boloes.push(response.data[x]); }
					}	
			$scope.$broadcast('scroll.refreshComplete');
			});
			$ionicLoading.hide();
		}, function(){
			mensagem('Mensagem Alerta', 'Não foi possível carregar os bolões verifique sua conexão com a internet.');
		})*/		
	}
}])
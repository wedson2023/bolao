app

.controller('homeCtrl', ['config', 'http', 'mensagem', 'session', '$interval', '$ionicLoading', '$filter', function(config, http, mensagem, session, $interval, $ionicLoading, $filter){
	
	var self = this;	
	self.titulo = 'Bolões';	
	self.boloes = [];
	
	//$interval(function(){
	$ionicLoading.show({ template: 'Aguarde ...', duration: 5000 });
	http('GET', config.host + '/boloes?visivel=0', null, { 'token' : session.token }).then(function(response){	
		http('GET', config.host + '/relatorio/data', null, { token : session.token }).then(function(resp){
			var cur = new Date(resp.data);
			
			for(x in response.data){				
				var horario = response.data[x].confrontos.sort(function(a, b){ return a.horario > b.horario; });
				var horario = new Date(horario[0].horario)
				
				if(cur < horario){
						self.boloes.push(response.data[x]);
				   }
				}					
		});
		$ionicLoading.hide();
	}, function(){
		mensagem('Mensagem Alerta', 'Não foi possível carregar os bolões verifique sua conexão com a internet.');
	})	
}])
app

.controller('bolaoCtrl', ['http', 'config', 'mensagem', '$stateParams', '$ionicLoading', '$filter', function(http, config, mensagem, $stateParams, $ionicLoading, $filter){
	
	var self = this;
	self.titulo = 'Bolão';
	$ionicLoading.show({ template: 'Aguarde ...', duration: 5000 });
	http('GET', config.host + /boloes/ + $stateParams.id, null, { token : config.token }).then(function(response){
		$ionicLoading.hide();
		self.bolao = response.data;	
		var horario = response.data.confrontos.sort(function(a, b){ return a.horario > b.horario; })
		self.horario = { abertura :horario[0].horario, fechamento : horario[horario.length - 1].horario };
	 }, function(err){
		$ionicLoading.hide();
		mensagem('Mensagem de alerta', response.data.mensagem);
	})	
}])
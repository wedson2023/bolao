app

.service('mensagem', function($ionicPopup){
	return function(titulo, mensagem){	
		return $ionicPopup.alert({
			title : titulo,
			template : mensagem
		});
	}
})
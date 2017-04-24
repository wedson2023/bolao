app.
service('sessoes', function($http){
	return function(response){	
		for(x in response){
			sessionStorage.setItem(x, response[x]);
		}
	}
})

.service('mensagem', function($ionicPopup){
	return function(titulo, mensagem){	
		return $ionicPopup.alert({
			title : titulo,
			template : mensagem
		});
	}
})
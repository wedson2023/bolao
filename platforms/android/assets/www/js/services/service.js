app.
service('sessoes', function($http){
	return function(response){	
		for(x in response){
			sessionStorage.setItem(x, response[x]);
		}
	}
})

.service('tabela', function($ionicPopup){
	return function(dados){	
		var ESC = "\u001B";
		var GS = "\u001D";
		var INI = ESC + "@";   //inicializa a impressora
		var NEGRITO = ESC + "E" + "1";  //inicializa o negrito...para finalizar o negrito utilize Ini
		var DOUBLEON = GS + "!" + "\u0001"; //inicializa dobra o tamanho da fonte... para finalizar utilize ini
		var ENTER = String.fromCharCode(0x0A);  //LF funciona para pular a linha
		var CENTRO = ESC + "a" + "1";  //inicializa centralizar para finalizar utilize ini
		var LEFT = ESC + "a" + "0";  //alinha a esquerca
		var REVERSO = GS + "B" + "1";  //fundo negro e letras transparantes
		var SMALL = ESC + "!" + "\u0001";  //fonte menor
		
		
		var text = ENTER + CENTRO + NEGRITO + 'SISTEMA BOLAO' + ENTER + INI;
		for(x in dados.apostas){
			text += ENTER + CENTRO + NEGRITO + DOUBLEON + dados.casa + ' ' + dados.apostas[x].pcasa + ' x ' + dados.apostas[x].pfora + ' ' + dados.fora + ENTER + INI;
		}
		return text;
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
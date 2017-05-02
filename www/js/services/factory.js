app

.factory('config', function(){
	return {
		host : 'http://localhost:3000',
		empresa : 'Bolão Futebol',
		_id : sessionStorage.getItem('_id'),
		nome : sessionStorage.getItem('nome'),
		nivel : sessionStorage.getItem('nivel'),
		visivel : sessionStorage.getItem('visivel'),
		token : sessionStorage.getItem('token')
		
	}
})

.factory('apostador', function(config){
	return function(response){
		return {
			bolao : response._id,
			agente : config._id,
			valor : response.valor,
			apostas : []
		}
	}
})
	
.factory('bolao', function(config){	
		return {
			nome : null,
			valor : null,
			horario : null,
			lugares : ['', '', ''],
			porcentagem : [],			
			confrontos : [
				{id : 1, horario : null, casa : null, fora : null, pcasa : null, pfora : null },
				{id : 2, horario : null, casa : null, fora : null, pcasa : null, pfora : null },
				{id : 3, horario : null, casa : null, fora : null, pcasa : null, pfora : null },
				{id : 4, horario : null, casa : null, fora : null, pcasa : null, pfora : null },
				{id : 5, horario : null, casa : null, fora : null, pcasa : null, pfora : null }
				]
			}	
})

.factory('agentes', function(){
	return {
		nome : null,
		senha : null
	}
})

.factory('http', function($http){
	return function(method, url, data, headers){		
		return $http({ method : method, url : url, data : data, headers : headers});		
	}
})
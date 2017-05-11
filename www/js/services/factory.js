app

.factory('config', function(){
	return {
		host : 'http://159.203.133.215:3000',
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
		nome : 'programador',
		senha : '12345'
	}
})

.factory('http', function($http){
	return function(method, url, data, headers){		
		return $http({ method : method, url : url, data : data, headers : headers});		
	}
})

.factory('dadosrelatorio', function(){
	return function(dados){		
		return {
			apostas : dados.length,
			premio : dados.reduce(function(prev, cur){ return prev + parseFloat(cur.premio) }, 0),
			comissao : dados.reduce(function(prev, cur){ return prev + parseFloat(cur.comissao) }, 0),
			bruto : dados.reduce(function(prev, cur){ return prev + parseFloat(cur.valor) }, 0),
			liquido : dados.reduce(function(prev, cur){ return prev + parseFloat(cur.admin) }, 0),
		}		
	}
})

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

.factory('confrontos', function(){
	return function(response){
		return {
			idbolao : response._id,
			valor : response.valor,
			apostas : []
		}
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
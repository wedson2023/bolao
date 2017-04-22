app

.factory('config', function(){
	return {
		host : 'http://localhost:3000',
		token : sessionStorage.getItem('token'),
		empresa : 'Bolão Futebol'
	}
})

.factory('agentes', function(){
	return {
		nome : null,
		senha : null
	}
})

.factory('http', function($http){
	return {
		acessar : function(method, url, data, headers){
			return $http({ method : method, url : url, data : data, headers : headers});
		}
	}
})
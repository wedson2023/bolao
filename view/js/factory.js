app

.factory('config', function(){
	return {
		host : 'http://138.197.98.87:3000',
		path : 'http://138.197.98.87',
		empresa : 'Bolão Futebol'		
	}
})

.factory('http', function($http){
	return function(method, url, data, headers){		
		return $http({ method : method, url : url, data : data, headers : headers});		
	}
})

.factory('progresso', function(ngProgressFactory){
		return { 
			create : ngProgressFactory.createInstance()			
		}
})

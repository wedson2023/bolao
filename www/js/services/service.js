app.service('sessoes', function($http){
	return function(response){	
		for(x in response){
			sessionStorage.setItem(x, response[x]);
		}
	}
})
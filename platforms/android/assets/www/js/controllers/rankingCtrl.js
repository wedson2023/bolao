app

.controller('rankingCtrl', ['config', 'http', 'boloes', 'mensagem', '$ionicLoading', 'session', function(config, http, boloes, mensagem, $ionicLoading, session){
	
	var self = this;	
	self.titulo = 'Ranking';
	self.boloes = boloes.data;	
	
	self.pesquisar = function(id){
		$ionicLoading.show({ template: 'Aguarde ...', duration: 5000 });
		http('GET', config.host + '/ranking/' + id, null, { token : session.token }).then(function(response){			
		var collection = [];
		var bolao = boloes.data.filter(function(elemento){ return elemento._id == id })[0];
		for(x in response.data){			
			var cliente = [];
			for(i in response.data[x].apostas){
				if(response.data[x].apostas[i]._id == bolao.confrontos[i]._id){	
					if(response.data[x].apostas[i].pcasa == bolao.confrontos[i].pcasa && response.data[x].apostas[i].pfora == bolao.confrontos[i].pfora){
						cliente.push(15);
					}else if(response.data[x].apostas[i].pcasa == response.data[x].apostas[i].pcasa && response.data[x].apostas[i].pfora == bolao.confrontos[i].pfora){
						cliente.push(5);
					}else if(response.data[x].apostas[i].pcasa > response.data[x].apostas[i].pfora && bolao.confrontos[i].pcasa > bolao.confrontos[i].pfora){
						cliente.push(5);
					}else if(response.data[x].apostas[i].pfora > response.data[x].apostas[i].pcasa && bolao.confrontos[i].pfora > bolao.confrontos[i].pcasa){
						cliente.push(5);	
					}else{
						cliente.push(0);
					}
				}
			}
			
			var pontos = cliente.reduce(function(prev, cur){ return prev + cur}, 0);
			var placar = cliente.filter(function(elemento){ return elemento == 15});
			var time = cliente.filter(function(elemento){ return elemento == 5});
			var erros = cliente.filter(function(elemento){ return elemento == 0});
			
			collection.push({ 
				nome : response.data[x].nome,
				placar : placar.length,
				time : time.length,
				erros : erros.length,
				pontos : pontos
			});
		}
			
		collection.sort(function(a, b){ return b.pontos - a.pontos });
		
		var a = 0;
		self.lugares = bolao.lugares.length;
		while(a < bolao.lugares.length){			
			if(a < collection.length){
				if(collection[a + 1]){
					if(collection[a].pontos == collection[a + 1].pontos){
						if(collection[a + 1].pontos != 0){ self.lugares++; }									
					}
				}				
			}
			a++;	
		}
			
		self.clientes = collection;
		$ionicLoading.hide();
	}, function(err){
		$ionicLoading.hide();
		mensagem('Mensagem sucesso', 'Não foi possível carregar, a lista de apostadores. Err ' + err.data);
	})
	}
}])
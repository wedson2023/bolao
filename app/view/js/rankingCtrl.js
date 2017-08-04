app
.controller('rankingCtrl', ['config', 'http', '$scope', 'progresso', function(config, http, $scope, progresso){
	
	var self = this;	
	self.titulo = 'Ranking';
	var session = { token : true };
	progresso = progresso.create;
	progresso.setColor('#15B9FF');
	
	http('GET', config.host + '/boloes/todos', null, { token : session.token }).then(function(response){
		self.boloes = response.data;
	})					
	
	self.pesquisar = function(id){		
		if(!id) return false;
		progresso.start();
		http('GET', config.host + '/ranking/' + id + '?agente=59288268015e0843fe8abd5a&nivel=0', null, { token : session.token }).then(function(response){
		var collection = [];
		var acumulado = response.data.bolao;
		response.data = parseInt(session.nivel) ? response.data.usuario : response.data.bolao;
		var bolao = self.boloes.filter(function(elemento){ return elemento._id == id })[0];
			
		for(x in response.data){			
			var cliente = [];			
			for(i in response.data[x].apostas){
				var confronto = bolao.confrontos.filter(function(elemento){ return elemento._id == response.data[x].apostas[i]._id })[0];
				if(response.data[x].apostas[i].pcasa == confronto.pcasa && response.data[x].apostas[i].pfora == confronto.pfora){
					cliente.push(15);					
				}else if(response.data[x].apostas[i].pcasa == response.data[x].apostas[i].pfora && confronto.pcasa == confronto.pfora && confronto.pcasa != null && confronto.pfora != null){
					cliente.push(5);
				}else if(response.data[x].apostas[i].pcasa > response.data[x].apostas[i].pfora && confronto.pcasa > confronto.pfora && confronto.pcasa != null && confronto.pfora != null){
					cliente.push(5);
				}else if(response.data[x].apostas[i].pfora > response.data[x].apostas[i].pcasa && confronto.pfora > confronto.pcasa && confronto.pcasa != null && confronto.pfora != null){
					cliente.push(5);	
				}else{
					cliente.push(0);
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
		self.clientes.acumulado = acumulado.reduce(function(prev, cur){ return prev + parseInt(cur.premio);}, 0)
		progresso.complete();
	}, function(err){
		progresso.complete();
		mensagem('Mensagem sucesso', 'Não foi possível carregar, a lista de apostadores. Err ' + err.data);
	})
	}
}])
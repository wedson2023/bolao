app

.controller('relatorioCtrl', ['$filter', 'http', 'config', 'agentes', 'mensagem', 'dadosrelatorio', 'boloes', 'session', function($filter, http, config, agentes, mensagem, dadosrelatorio, boloes, session){
	
	var self = this;	
	self.titulo = 'Relatório';
	self.agente = session;
	
	self.boloes = boloes.data;
	
	self.agentes = [];
	
	self.carregar = function(dados){
		if(dados.first != null && dados.last == null || dados.first == null && dados.last != null){
			mensagem('Mensagem alerta', 'Os dois campos data devem ter algum valor')
		}else if(dados.first == null && dados.last == null && dados.bolao == undefined){
			mensagem('Mensagem alerta', 'O campo bolão ou as duas datas precisam esta definiadas para poder carregar os dados.')
		}else{	
			
			var first = $filter('date')(dados.first, 'yyyy-MM-dd');
			var last = $filter('date')(dados.last, 'yyyy-MM-dd');
			
			http('GET', config.host + '/relatorio/listar?first=' + first + '&last=' + last + '&bolao=' + dados.bolao + '&agente=' + session._id + '&nivel=' + session.nivel, null, { token : session.token }).then(function(response){			
				self.agentes = [];
				self.relatorio = dadosrelatorio(response.data);
				for(x in agentes.data){
					if(agentes.data[x].nivel != 0){
					var apostas = response.data.filter(function(elemento){ return elemento.agente == agentes.data[x]._id });

					self.agentes.push({ nome : agentes.data[x].nome, dados : {			
						apostas : apostas.length,
						comissao : apostas.reduce(function(prev, cur){ return prev + parseFloat(cur.comissao) }, 0),			
						bruto : apostas.reduce(function(prev, cur){ return prev + parseFloat(cur.valor) }, 0),
						premio : apostas.reduce(function(prev, cur){ return prev + parseFloat(cur.premio) }, 0),
						liquido : apostas.reduce(function(prev, cur){ return prev + parseFloat(cur.admin) }, 0)
					}});
					}
				}
				
			})	
		}
		
	}

	
}])
app

.controller('relatorioCtrl', ['$filter', 'http', 'config', 'relatorio', 'mensagem', 'dadosrelatorio', 'agentes', 'boloes', function($filter, http, config, relatorio, mensagem, dadosrelatorio, agentes, boloes){
	
	var self = this;	
	self.titulo = 'Relatório';
	self.agente = config;
	
	self.relatorio = dadosrelatorio(relatorio.data);
	self.boloes = boloes.data;
	
	self.carregar = function(dados){
		if(dados.first != null && dados.last == null || dados.first == null && dados.last != null){
			mensagem('Mensagem alerta', 'Os dois campos data devem ter algum valor')
		}else if(dados.first == null && dados.last == null && dados.bolao == undefined){
			mensagem('Mensagem alerta', 'O campo bolão ou as duas datas precisam esta definiadas para poder carregar os dados.')
		}else{		
			http('GET', config.host + '/relatorio/listar?first=' + dados.first + '&last=' + dados.last + '&bolao=' + dados.bolao, null, { token : config.token }).then(function(response){
				console.log(response.data)
			})	
		}
		
	}
	
	self.agentes = [];
	
	for(x in agentes.data){
		if(agentes.data[x].nivel != 0){
		var apostas = relatorio.data.filter(function(elemento){ return elemento.agente == agentes.data[x]._id });
		
		self.agentes.push({ nome : agentes.data[x].nome, dados : {			
			apostas : apostas.length,
			comissao : apostas.reduce(function(prev, cur){ return prev + parseFloat(cur.comissao) }, 0),			
			bruto : apostas.reduce(function(prev, cur){ return prev + parseFloat(cur.valor) }, 0),
			premio : apostas.reduce(function(prev, cur){ return prev + parseFloat(cur.premio) }, 0),
			liquido : apostas.reduce(function(prev, cur){ return prev + parseFloat(cur.admin) }, 0)
		}});
		}
	}
	
	
}])
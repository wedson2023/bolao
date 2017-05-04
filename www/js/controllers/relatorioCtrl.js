app

.controller('relatorioCtrl', ['http', 'config', 'relatorio', 'mensagem', function(http, config, relatorio, mensagem){
	
	var self = this;	
	self.titulo = 'Relatório';
	
	if(config.nivel == 0){
		var apostas = relatorio.data.length;
		var bruto = relatorio.data.reduce(function(prev, cur){ return prev + parseFloat(cur.valor) }, 0);
		var premio = relatorio.data.reduce(function(prev, cur){ return prev + parseFloat(cur.premio) }, 0);
		var agente = relatorio.data.reduce(function(prev, cur){ return prev + parseFloat(cur.agente) }, 0);
		var admin = relatorio.data.reduce(function(prev, cur){ return prev + parseFloat(cur.admin) }, 0);
		
		self.relatorio = {
			apostas : apostas,
			premio : premio,
			comissao : agente,
			bruto : bruto,
			liquido : admin
		}
	}
	
	//parei aqui 
	
	console.log(self.relatorio)
}])
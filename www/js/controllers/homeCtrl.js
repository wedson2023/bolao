app

.controller('homeCtrl', ['http', 'boloes', 'mensagem', '$timeout', function(http, boloes, mensagem, $timeout){
	
	var self = this;	
	self.titulo = 'Bolões';
	self.boloes = boloes.data;
	
}])
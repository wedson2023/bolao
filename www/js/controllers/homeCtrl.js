app

.controller('homeCtrl', ['http', 'boloes', 'mensagem', function(http, boloes, mensagem){
	
	var self = this;	
	
	self.boloes = boloes.data;
	self.mensagem = 'entrou';
}])
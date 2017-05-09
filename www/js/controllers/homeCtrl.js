app

.controller('homeCtrl', ['http', 'boloes', 'mensagem', function(http, boloes, mensagem){
	
	var self = this;	
	self.titulo = 'Bolões';
	self.boloes = boloes.data;
	
}])
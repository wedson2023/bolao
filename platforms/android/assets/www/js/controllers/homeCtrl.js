app

.controller('homeCtrl', ['http', 'boloes', 'mensagem', '$timeout', 'session', function(http, boloes, mensagem, $timeout, session){
	
	var self = this;	
	self.titulo = 'Bolões';
	self.boloes = boloes.data;
}])
app

.controller('impressoraCtrl', ['http', 'mensagem', function(http, mensagem){
	
	var self = this;	
	self.titulo = 'Impressora';
	self.impressoras = [];
	
	bluetoothSerial.enable();
	
	self.conectada = localStorage.getItem('impressora');
	
	self.pesquisar = function(){			
		bluetoothSerial.list(function(device){
			self.impressoras.push({ nome : device.nome, id : device.id });
		}, function(){
			mensagem('Mensagem alerta', 'Algo deu errado');
		});		
	}
	
	self.conectar = function(id, impressora){
		localStorage.clear();			
		bluetoothSerial.connect(id, function(){
			localStorage.setItem('id', id);
			localStorage.setItem('impressora', impressora);			
		}, function(){
			mensagem('Mensagem alerta', 'Ocorreu um erro ao conectar a impressora.');
		})
	}
	
}])
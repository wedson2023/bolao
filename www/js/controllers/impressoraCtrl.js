app

.controller('impressoraCtrl', ['http', '$timeout', 'mensagem', '$ionicLoading', 'session', function(http, $timeout, mensagem, $ionicLoading, session){
	
	var self = this;	
	self.titulo = 'Impressora';
	self.impressoras = [];
	
	bluetoothSerial.isEnabled(null,function(){
		bluetoothSerial.enable();
	});
	
	self.conectada = localStorage.getItem('impressora');
	
	self.pesquisar = function(){
		$ionicLoading.show({ template: 'Aguarde ...', duration: 5000 });
		bluetoothSerial.list(function(device){			
			self.impressoras = device;
			$timeout(function(){
				$ionicLoading.hide();
				self.impressoras = device;
			}, 500);
		}, function(){
			mensagem('Mensagem alerta', 'Algo deu errado');
		});		
	}
	
	self.conectar = function(id, impressora){
		localStorage.clear();
		bluetoothSerial.disconnect();
		$ionicLoading.show({ template: 'Aguarde ...', duration: 15000 });
		bluetoothSerial.connect(id, function(){			
			mensagem('Mensagem Sucesso', 'Você esta conectado há ' + impressora + ' agora está pronto para fazer impressões.');
			localStorage.setItem('id', id);
			localStorage.setItem('impressora', impressora);
			self.conectada = impressora;
			ESC = "\u001B";
			INI = ESC + "@";
			CENTRO = ESC + "a" + "1";
			NEGRITO = ESC + "E" + "1"; 
			ENTER = String.fromCharCode(0x0A); 

			bluetoothSerial.write(ENTER + CENTRO + NEGRITO + 'IMPRESSORA PRONTA' + ENTER + ENTER + ENTER + ENTER + ENTER + INI);
			$ionicLoading.hide();
		}, function(){
			mensagem('Mensagem alerta', 'Verifique se a impressora esta ligada, caso esteja e o problema persista ligue e desligue seu aparelho e a impressora.');
			$ionicLoading.hide();
		})
	}
	
	self.desconectar = function(){
		localStorage.clear();
		self.conectada = null;
		bluetoothSerial.isEnabled(function(){
			bluetoothSerial.disconnect(function(){
				mensagem('Mensagem sucesso', 'A impressora foi desconectada com sucesso.');
			})
		},function(){
			bluetoothSerial.enable(function(){
				bluetoothSerial.disconnect(function(){
					mensagem('Mensagem sucesso', 'A impressora foi desconectada com sucesso.');
				})
			});
		});
	}
	
}])
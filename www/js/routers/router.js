var app = angular.module('bolao', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
	
	$urlRouterProvider.otherwise('/login');
	
	$stateProvider	
	.state('login', {
		url : '/login',
		templateUrl : 'content/login.html',
		controller : 'loginCtrl as ctrl'
	})
	
	.state('menu', {
		url : '/menu',
		templateUrl : 'content/menu.html',
		controller : 'menuCtrl as ctrl'
	})
	
	.state('menu.home', {
		url : '/home',
		views : {
			'menucontent' : {
			templateUrl : 'content/home.html',
			controller : 'homeCtrl as ctrl',
			resolve : {
				boloes : function(config, http){
					return http('GET', config.host + '/boloes?visivel=0', null, { 'token' : config.token });
				}
			}
		}
	}		
	})	
	
	.state('menu.boloes', {
		url : '/boloes',
		views : {
			'menucontent' : {
			templateUrl : 'content/boloes.html',
			controller : 'boloesCtrl as ctrl',
			resolve : {
				boloes : function(config, http){
					return http('GET', config.host + '/boloes', null, { 'token' : config.token });
				}
			}
		}
	}		
	})
	
	.state('menu.boloes.cadastrar-boloes', {
		url : '/cadastrar-boloes',
		templateUrl : 'content/cadastrar-boloes.html',
	})
	
	.state('menu.bolao', {
		url : '/bolao/:id',
		views : {
			'menucontent' : {
				templateUrl : 'content/bolao.html',
				controller : 'bolaoCtrl as ctrl'
			}
		}		
	})
	
	.state('menu.bolao.cadastrar-aposta', {
		url : '/cadastrar-aposta',
		templateUrl : 'content/cadastrar-aposta.html'			
	})
	
	.state('menu.bolao.listar-clientes', {
		url : '/listar-clientes',
		templateUrl : 'content/listar-clientes.html'			
	})
	
		
	
	.state('menu.agentes', {
		url : '/agentes',
		views : {
			'menucontent' : {
			templateUrl : 'content/agentes.html',
			controller : 'agentesCtrl as ctrl',
			resolve : {
				agentes : function(config, http){
					return http('GET', config.host + '/agentes', null, { 'token' : config.token });
				}
			}
		}
	}		
	})
	
	.state('menu.boloes.cadastrar-agentes', {
		url : '/cadastrar-agentes',
		templateUrl : 'content/cadastrar-agentes.html',
	})
	
	.state('menu.relatorio', {
		url : '/relatorio',
		views : {
			'menucontent' : {
			templateUrl : 'content/relatorio.html',
			controller : 'relatorioCtrl as ctrl',
			resolve : {
				relatorio : function(config, http){
					return http('GET', config.host + '/relatorio', null, { 'token' : config.token });
				},
				
				agentes : function(config, http){
					return http('GET', config.host + '/agentes', null, { token : config.token });
				},
				
				boloes : function(config, http){
					return http('GET', config.host + '/boloes', null, { 'token' : config.token });
				}
			}
		}
	}		
	})
	
	$urlRouterProvider.otherwise('/login');
})
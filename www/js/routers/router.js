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
					return http('GET', config.host + '/boloes', null, { 'token' : config.token });
				}
			}
		}
	}
		
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
	
	$urlRouterProvider.otherwise('/login');
})
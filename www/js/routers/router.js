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
	
	$stateProvider		
	.state('login', {
		url : '/',
		templateUrl : 'content/login.html',
		controller : 'loginCtrl as ctrl'
	})
	
	.state('home', {
		url : '/home',
		templateUrl : 'content/home.html',
		controller : 'homeCtrl as ctrl',
		resolve : {
			boloes : function(config, http){
				return http('GET', config.host + '/boloes', null, { 'token' : config.token });
			}
		}
	})
	
	.state('boloes/:id', {
		url : '/boloes/:id',
		templateUrl : 'content/boloes.html',
		controller : 'boloesCtrl as ctrl'
	})
	
	$urlRouterProvider.otherwise('/');
})
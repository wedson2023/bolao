angular.module('bolao', ['ionic'])

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
	.state('home', {
		url : '/',
		templateUrl : 'content/home.html',
		controller : 'homeCtrl as ctrl'
	})
	
	$urlRouterProvider.otherwise('/');
})

.controller('principaCtrl', function($ionicSideMenuDelegate){
	var self = this;
	self.menu = function() {
    	$ionicSideMenuDelegate.toggleLeft();
	};
})
app

.controller('homeCtrl', function(){
	
	var self = this;
	
	self.openmenu = function() {
    	$ionicSideMenuDelegate.toggleLeft();
	};
})
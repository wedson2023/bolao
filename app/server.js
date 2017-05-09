var forever = require('forever-monitor');
var monitor = forever.Monitor;

var child = new monitor('app.js', {
	max : 10,
	silent : true,
	killTree : true,
	logFile : 'logs/forever.log',
	outFile : 'logs/app.log',
	errFile : 'logs/error.log'
})

child.on('exit', function(){
	console.log('servidor finalizado');
})

child.start();
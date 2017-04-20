var express = require('express');
var load = require('express-load');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var error = require('./middlewares/error');
var app = express();

global.conexao = mongoose.connect('mongodb://localhost/bolao');

app.disable('x-powered-by');
app.use(expressSession({	 
  secret : 'chave',
  name : 'sessionid',
  cookie : {
	  secure : true,
	  httpOnly : true,
	  domain : 'localhost:3000'
  }
}));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

load('models').then('controllers').then('middlewares').then('routers').into(app);

app.use(error.notFound);
app.use(error.serverError);

app.listen(3000, function(){
	console.log('Servidor online');
})
module.exports = function(){
	var Schema = require('mongoose').Schema;	
	
	var aposta = Schema({
			_id : String,
			pcasa : Number,
			pfora : Number
		})
	
	var apostador = Schema({
			bolao : String,
			agente : String,
			nome : { type : String, required : true },
			valor : { type : Number, required : true },
			apostas : [aposta],
			horario : {type : Date, default : Date.now }
		})
	
	return conexao.model('apostador', apostador);
}
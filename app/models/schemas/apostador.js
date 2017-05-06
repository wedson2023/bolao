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
			premio : String,
			comissao : String,
			admin : String,
			valor : { type : Number, required : true },
			apostas : [aposta],
			horario : {type : Date, default : Date.now }
		})
	
	apostador.methods.valorpremio = function(premio, porcentagem){
		return premio / 100 * porcentagem;
	}
	
	apostador.methods.valorcomissao = function(comissao, porcentagem){
		return comissao / 100 * porcentagem;
	}
	
	apostador.methods.valoradmin = function(admin, porcentagem){
		return admin / 100 * porcentagem;
	}
	
	return conexao.model('apostador', apostador);
}
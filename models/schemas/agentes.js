module.exports = function(){	
	var jwt = require('jsonwebtoken');
	var Schema = require('mongoose').Schema;
	
	var aposta = Schema({
			idconfronto : Number,
			pcasa : Number,
			pfora : Number
		})
	
	var apostador = Schema({
			nome : { type : String, required : true },
			valor : { type : Number, required : true },
			apostas : [aposta],
			horario : Date
		})
	
	var agentes = Schema({
		nome : { type : String, required : true, index : { unique : true }},
		senha : { type : String, required : true },
		token : { type : String, required : true },
		apostador : [apostador],
		create_at : Date,
		update_at : Date
	})
	
	agentes.methods.gerartoken = function(nome){
		return jwt.sign({nome : nome}, 'segredo');
	}
	
	return conexao.model('agentes', agentes);
}
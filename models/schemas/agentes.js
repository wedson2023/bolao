module.exports = function(){
	var Schema = require('mongoose').Schema;
	
	var agentes = Schema({
		nome : { type : String, required : true },
		login : { type : String, required : true },
		senha : { type : String, required : true }
	})
	
	return conexao.model('agentes', agentes);
}
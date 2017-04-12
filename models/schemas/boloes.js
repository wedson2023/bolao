module.exports = function(){
	var Schema = require('mongoose').Schema;
	
	var confronto = Schema({
			horario : Date,
			casa : String,
			fora : String,
			pcasa : Number,
			pfora : Number
		})
	
	
	var boloes = Schema({
		nome : String,
		confrontos : [confronto],		
		valor : String,
		porcentagem : [String],
		lugares : [String],
		create_at : Date,
		update_at : Date
	})
	
	return conexao.model('boloes', boloes);
}
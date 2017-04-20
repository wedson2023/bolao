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
		nome : {type : String, required : true },
		confrontos : [confronto],		
		valor : {type : Number, required : true },
		visivel : { type : String, default : 0 },
		porcentagem : [String],
		lugares : [String],
		create_at : Date,
		update_at : Date
	})
	
	return conexao.model('boloes', boloes);
}
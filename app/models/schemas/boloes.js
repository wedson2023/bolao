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
		visivel : { type : Number, default : 0 },
		porcentagem : [Number],
		lugares : [Number],
		create_at : {type : Date, default : Date.now },
		update_at : {type : Date, default : Date.now }
	})
	
	return conexao.model('boloes', boloes);
}
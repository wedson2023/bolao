module.exports = function(){	
	var jwt = require('jsonwebtoken');
	var bcrypt = require('bcrypt');
	var Schema = require('mongoose').Schema;	
	
	var agentes = Schema({
		nome : { type : String, required : true, index : { unique : true }},
		senha : { type : String, required : true },
		token : { type : String, required : true },
		visivel : { type : Number, default : 2 },
		nivel : { type : Number, default : 0 },
		create_at : Date,
		update_at : Date
	})
	
	agentes.methods.gerartoken = function(nome){
		return jwt.sign({nome : nome}, 'segredo');
	}
	
	agentes.methods.criptografar = function(senha){
		return bcrypt.hashSync(senha, bcrypt.genSaltSync(9));
	}
	
	agentes.methods.comparar = function(senha, banco, callback){
		return bcrypt.compare(senha, banco, callback);
	}
	
	return conexao.model('agentes', agentes);
}
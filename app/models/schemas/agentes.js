module.exports = function(){	
	var jwt = require('jsonwebtoken');
	var bcrypt = require('bcrypt');
	var Schema = require('mongoose').Schema;	
	
	var agentes = Schema({
		nome : { type : String, required : true, index : { unique : true }},
		senha : { type : String, required : true },
		token : { type : String, required : true },
		visivel : { type : Number, default : 0 },
		nivel : { type : Number, default : 1 },
		create_at : { type : Date, default : Date.now },
		update_at : { type : Date, default : Date.now }
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
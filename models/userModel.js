const mongoose = require('mongoose'); //sempre assim, sem alteração
const Schema = mongoose.Schema; //sempre assim, sem alteração

const UserSchema = new Schema({  //tais declarações são definidas em seus padrões, mas o schema é a mesma sintaxe
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},  //os padrões são o email, senha, etc.
    name: {type: String}  //sempre cuidar os nomes das váriaveis, caso o nome for diferente o bdd não salva
}, {
    
    timestamps: true,
});
//sem o exports não funciona o require
module.exports = mongoose.model('User', UserSchema); //alterando o nome, com base do que vc quer userLivro, etc. A exportação

//require salva o que o usuário escreve
//unique não deixa salvar a mesma informação lá dentro, os mesmos caracteres(valores), tipo 123 e outro coloca 123 ele não deixa essa senha

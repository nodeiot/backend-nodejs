const mongoose = require('mongoose'); //sempre assim, sem alteração
const Schema = mongoose.Schema; //sempre assim, sem alteração

const UserSchema = new Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    name: {type: String}
}, {
    
    timestamps: true,
} 
);

module.exports = mongoose.model('User', UserSchema); //alterando o nome, com base do que vc quer userLivro, etc.
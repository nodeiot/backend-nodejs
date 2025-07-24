const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, require: true, unique: true },
    password: {type: String, require: true },
    name: {type: String }
}, {
    timestamps: true, //pega data e hora do BANCO e salva quando adicionar um dado
}
);

module.exports = mongoose.model('User', userSchema);
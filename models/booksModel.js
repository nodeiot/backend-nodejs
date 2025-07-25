const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    title: { type: String, require: true },
    author: { type: String, require: true },
    year: { type: Number },
    genre: { type: String }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Book', bookSchema);
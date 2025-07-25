const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const moviesModel = new Schema (
{   userId: { type: Schema.Types.ObjectId, ref: 'User'},
    movieName: {type: String, require: true,},
    year: {type: Number, require: true,},
    director: {type: String},
    studio: {type: String}
},
{
    timestamps: true,
});

module.exports = mongoose.model('Movie', moviesModel)
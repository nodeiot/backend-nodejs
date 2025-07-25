
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GamesSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    titulo: { type: String, require: true, unique: true },
    anolancamento: { type: String, require: true },
    desenvolvedora: { type: String }
    
  },{
    
    timestamps: true,
  }
);

module.exports = mongoose.model("Games", GamesSchema);
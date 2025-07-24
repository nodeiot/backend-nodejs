const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const musicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: String,
    genre: String,
    year: Number,
  },
  {
    timestamps: true,
  }
);

musicSchema.index({ title: 1, artist: 1 }, { unique: true });

module.exports = mongoose.model("Music", musicSchema);

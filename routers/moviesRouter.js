const { Router } = require("express");
const expressAsyncHandler = require("express-async-handler");
const Movie = require("../models/moviesModel");

const movieRouter = Router();

movieRouter.get(
  "/getMovies",
  expressAsyncHandler(async (req, res) => {
    try {
      const movies = await Movie.find({});
      if (!movies) {
        return res.status(400).send({ message: "Nenhum filme encontrado" });
      }
      return res.status(200).send({ message: `Filmes encontrado: ${movies}` });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  })
);

module.exports = movieRouter
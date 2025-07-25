const { Router } = require('express')
const expressAsyncHandler = require('express-async-handler');
const Movie = require('../models/moviesModel');
const { generateToken, isAuth } = require('../utils');

const movieRouter = Router();

movieRouter.post('/create', expressAsyncHandler(async (req, res) => {

    try{
        const {movieName, year, director, studio} = req.body

        if (!movieName || !year) return res.status(400).send({ message: 'Informe o nome e o ano do filme.'})

        const movie = await Movie.create({
            movieName,
            year,
            director,
            studio
        })

        return res.status(200).send({message: `O filme ${movie.movieName} foi criado com sucesso.`})    

    } catch (error) {
        return res.status(400).send(error)
    }

}))

module.exports = movieRouter
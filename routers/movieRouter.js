const { Router } = require('express')
const expressAsyncHandler = require('express-async-handler');
const Movie = require('../models/moviesModel');
const { isAuth } = require('../utils');

const movieRouter = Router();

movieRouter.post('/update', isAuth, expressAsyncHandler(async (req, res) => {
    try{

        const {_id} = req.user
        const {movieId, director} = req.body   
           

        const movie = await Movie.findById(movieId)
        if (movie.userId.toString() != _id) return res.status(400).send({ message: "Voce nao criou esse filme!" })

        movie.director = director

        const movieUpdated = await movie.save();

        return res.status(200).send({ message: `Filme atualizado com sucesso!` })

    } catch(error){
        return res.status(400).send({ message: error })
    }
}))


module.exports = movieRouter
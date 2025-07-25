const { Router } = require('express')
const expressAsyncHandler = require('express-async-handler');
const Movie = require('../models/moviesModel');
const { generateToken, isAuth } = require('../utils');

const movieRouter = Router();

movieRouter.post('/update', isAuth, option, expressAsyncHandler(async (req, res) => {
    try{
        
        // 1 = nome 2 = ano 3 = diretor 4 = estudio, seletor pra alterar
        const {_id} = req.body
        if (req.body === Number) 

        
        switch(option){
            case 1: 
                const {newName} = req.body
                break;
            case 2: 

                break;
            case 3: 

                break;
            
            case 4: 

                break; 
        }
        

        const movie = await Movie.findById(_id)

        movie.name = newName
        const movieUpdated = await movie.save();

        return res.status(200).send({ message: `Filme atualizado com sucesso!` })

    } catch(error){
        return res.status(400).send({ message: error })
    }
}))


module.exports = movieRouter
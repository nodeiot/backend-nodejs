const { Router } = require('express')
const expressAsyncHandler = require('express-async-handler');
const Games = require('../models/gamesModel');
const { generateToken, isAuth } = require('../utils');

const gamesRouter = Router();

gamesRouter.post('/register', isAuth, expressAsyncHandler(async (req, res) => {
    try {
        const { titulo, anolancamento, desenvolvedora } = req.body;      
        const { _id } = req.user
       
        if (!titulo || !anolancamento) {
            return res.status(400).send({ message: 'Título e ano de lançamento são obrigatórios' });
        }

        const games= await Games.create({
            userId: _id,
            titulo,
            anolancamento,
            desenvolvedora
        });

        return res.status(200).send({ message: `Game "${games.titulo}" registrado com sucesso` });

    } catch (error) {
        return res.status(400).send({ message: 'Erro ao registrar game', error });
    }
}));

module.exports = gamesRouter;
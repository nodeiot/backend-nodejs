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

gamesRouter.post(
    "/update",
    isAuth,
    expressAsyncHandler(async (req, res) => {
      try {
        const userId = req.user._id;
        const { games } = req.body; // jogos deve ser um array de objetos com titulo, anolancamento, desenvolvedora sem qualquer informação vai quebrar
  
        if (!Array.isArray(games) || games.length === 0) {
          return res.status(400).send({ message: "Lista de jogos inválida, já estão cadastrados." });
        }
  
        // Remove todos os jogos antigos do usuário
        await Games.deleteMany({ userId });
  
        // Insere os novos jogos
        const newGames = games.map((game) => ({
          userId,
          titulo: game.titulo,
          anolancamento: game.anolancamento,
          desenvolvedora: game.desenvolvedora,
        }));
  
        await Games.insertMany(newGames);
  
        return res.status(200).send({ message: "Jogos atualizados com sucesso!" });
  
      } catch (error) {
        return res.status(400).send({ message: error })
      }
    })
  );
  
  gamesRouter.get("/mygames", isAuth, expressAsyncHandler(async (req, res) => {
      try {
        const userId = req.user._id;
  
        const games = await Games.find({ userId });
  
        return res.status(200).send(games);
  
      } catch (error) {
  
        return res.status(400).send({ message: error })
      }
    })
  );

module.exports = gamesRouter;
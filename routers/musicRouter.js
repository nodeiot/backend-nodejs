const { Router } = require("express");
const expressAsyncHandler = require("express-async-handler");
const Music = require("../models/musicModel.js");
const musicRouter = Router();

musicRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const { title, artist, album, genre, year } = req.body;

      if (!title || !artist)
        return res
          .status(400)
          .send({ message: "Título e artista são obrigatórios!" });

      const music = await Music.create({ title, artist, album, genre, year });

      return res
        .status(200)
        .send({ message: `Musica ${title} adicionada com sucesso!` });
    } catch (error) {
      if (error.code === 11000) {
        const { title, artist } = error.keyValue;
        return res.status(400).send({
          message: `Música ${title} do(a) artista ${artist} já cadastrado!`,
        });
      }
      return res.status(400).send(error);
    }
  })
);

module.exports = musicRouter;

const { Router } = require("express");
const { isAuth } = require("../utils.js");
const expressAsyncHandler = require("express-async-handler");
const Music = require("../models/musicModel.js");
const musicRouter = Router();

//Rota POST
musicRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { title, artist, album, genre, year } = req.body;

      if (!title || !artist)
        return res
          .status(400)
          .send({ message: "Título e artista são obrigatórios!" });

      const music = await Music.create({
        title,
        artist,
        album,
        genre,
        year,
        createdBy: req.user._id,
      });

      return res.status(200).send({
        message: `Musica ${title} adicionada com sucesso!`,
      });
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

//Rota Get
musicRouter.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const musics = await Music.find({ createdBy: req.user._id });

      if (musics.length === 0) {
        return res.status(404).send({ message: "Nenhuma música encontrada!" });
      }

      res.send(musics);
    } catch (error) {
      res.status(500).send({ message: "Erro ao buscar música", error });
    }
  })
);

//Rota PUT
musicRouter.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, artist, album, genre, year } = req.body;

    if (!title || !artist) {
      return res
        .status(400)
        .send({ message: "Título e artista são obrigatórios!" });
    }
    const music = await Music.findById(id);

    if (!music) {
      return res.status(404).send({ message: "Música não encontrada!" });
    }

    if (music.createdBy.toString() !== req.user._id) {
      return res.status(403).send({
        message: "Você não possui permissão para editar essa música!",
      });
    }

    music.title = title;
    music.artist = artist;
    music.album = album;
    music.genre = genre;
    music.year = year;

    await music.save();

    return res.status(200).send({ message: "Música atualizada com sucesso!" });
  })
);

module.exports = musicRouter;

//Rota DELETE
musicRouter.delete(
  "id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const music = await Music.findById(id);

    if (!music) {
      return res.status(404).send({ message: "Música não encontrada!" });
    }

    if (music.createdBy.toString() !== req.user._id) {
      return res.status(403).send({
        message: "Você não possui permissão para deletar essa música!",
      });
    }

    await Music.findByIdAndDelete(id);

    if (music.createdBy.toString() !== req.user._id) {
      return res.status(200).send({
        message: "Música deletada com sucesso!",
      });
    }
  })
);

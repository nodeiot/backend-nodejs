const { Router } = require("express");
const expressAsyncHandler = require("express-async-handler");
const Games = require("../models/gamesModel");
const { isAuth } = require("../utils");

const gamesRouter = Router();

gamesRouter.post(
  "/update",
  expressAsyncHandler(async (req, res) => {
    try {
      const { userId } = req.user;
      const { newGame } = req.body;
      const user = await User.findById(userId);
      user.game = newGame;
      const userUpdated = await user.save();
      return res
        .status(200)
        .send({ message: "Jogos favoritos atualizados com sucesso" });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  })
);
module.exports = gamesRouter;

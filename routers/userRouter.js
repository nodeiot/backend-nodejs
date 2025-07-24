const Router = require("express");
const expressAsyncHandler = require("express-async-handler");

const userSchema = require("../models/userModel");
const { generateToken, auth } = require("../utils");

const userRouter = Router();

let users = [];
userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    try {
      const { email, password, confirmPassword, name } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .send({ message: "E-mail e senha são obrigatorios" });
      }
      if (!email.includes("@")) {
        return res.status(400).send({ message: "E-mail invalido" });
      }

      const existingUser = await userSchema.findOne({ email: email});
      if (existingUser) {
          return res.status(400).send({ message: 'E-mail já cadastrado' });
      }

      const user = await userSchema.create({
        email,
        password,
        name,
      });

      return res
        .status(200)
        .send({ message: `Usuário ${user.name} criado com sucesso` });
    } catch (error) {
      return res.status(400).send(error);
    }
  })
);

userRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .send({ message: "E-mail e senha são obrigatorios!" });
      }
      const user = await userSchema.findOne({ email: email }).lean();
      console.log(user);
      if (!user) {
        return res.status(400).send({ message: "Usuário não cadastrado!" });
      }

      if (user.password != password) {
        return res.status(400).send({ message: "Senha invalida!" });
      }
      const { password: passwordToDelete, ...result } = user;
      const token =  generateToken(user)
      return res
        .status(200)
        .send({ user: {...result, token}, message: "Login realizado com sucesso!" });
    } catch (error) {
      return res.status(400).send(error);
    }
  })
);

userRouter.post("/update", auth, expressAsyncHandler(async (req, res) => {
  try{

    const {_id} = req.user
    const {newName} = req.body
    const user = await userSchema.findById(_id);
    console.log(user)
    user.name = newName;
    const userUpdate = await user.save();
    return res.status(200).send({message: `Usuário ${userUpdate} atualizado com sucesso`})

  }  catch (error) {
    return res.status(400).send(error);
  }
  
}))

module.exports = userRouter;

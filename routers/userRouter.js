const { Router } = require('express');
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModels');
const { generateToken, isAuth } = require('../utils');

const userRouter = Router();


userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    try {
        const { email, password, confirmPassword, name } = req.body;

        if (!email || !password) { return res.status(400).send({ message: 'Email e senhas são obrigatórios' }); }

        if (!email.includes('@')) { return res.status(400).send({ message: 'Email inválido' }); }

        if (password != confirmPassword) { return res.status(400).send({ message: 'Senhas diferentes' }); }

        const user = await User.create({ email, password, name });
        
        return res.status(200).send({ message: `Usuário ${user.name} criado com sucesso` });
 
    } catch (error) {
        return res.status(400).send({ message: 'Erro ao criar usuário' });
    }
   

}));

userRouter.post('/login', expressAsyncHandler(async (req, res) => {
   try {
    const { email, password } = req.body;

    if (!email || !password) { return res.status(400).send({ message: 'Email e senhas são obrigatórios' }); }

    const user = await User.findOne({ email: email }).lean();

    if (!user) return res.status(400).send({ message: 'Usuário não encontrado' });

    if (user.password != password) return res.status(400).send({ message: 'Senha incorreta' });

    const { password: passwordRemoved, ...result } = user;

    const token = generateToken(user);

    return res.status(200).send({ user: { ...result, token }, message: 'Usuário logado com sucesso' });

   } catch (error) {
    return res.status(400).send({ message: 'Erro ao logar usuário' });
   }

}))

userRouter.post('/update', isAuth, expressAsyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const newName = req.body.name;
        const user = await User.findById(_id);
        user.name = newName;
        const userUpdated = await user.save();
        console.log(newName);
        return res.status(200).send({  message: 'Usuário atualizado com sucesso'});

    } catch (error) {
        return res.status(401).send({ message: 'Erro ao logar usuário' });
    }
}))
module.exports = userRouter;


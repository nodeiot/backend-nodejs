const {Router} = require('express');
const expressAsyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const { generateToken } = require('../util');
const userRouter = Router();

userRouter.post('/register', expressAsyncHandler(async(req, res)=> { 

    try{
        const {email, password, passwordConfirm, name} = req.body

        if (!email || !password) return res.status(400).send({message: 'EMAIL E SENHA OBRIGATÓRIOS'})

        if(!email.includes('@')) return res.status(400).send({message: 'EMAIL NÃO VÁLIDO'})
        
        if(password != passwordConfirm) return res.status(400).send({ message: 'SENHA CONFIRMADA'})

        const user = await User.create({
            email,
            password,
            name
        });

        return res.status(200).send({message: `Usuário: ${user.name} CRIADO COM SUCESSO!`})

    }catch(error){

        return res.status(400).send(error)
    }

}));

    userRouter.post('/login', expressAsyncHandler(async (req, res)=> {

    try{
        const {email, password } = req.body

        if (!email || !password) return res.status(400).send({message: 'EMAIL E SENHA OBRIGATÓRIOS'})

        const user = await User.findOne({ email: email }).lean() //encontando o usuário pelo e-mail 

        if(!user) return res.status(400).send({ message: 'usuário não encontrado' })
        
        if(user.password != password) return res.status(400).send({message: 'senha inválida'})

        const { password: passwordRemoved, ...result} = user
        const token = generateToken(user)
        return res.status(200).send({ user: {...result, token}, message: 'login realizado com sucesso'})

    }catch(error){
        return res.status(400).send(error)
    }
}))

module.exports = userRouter;
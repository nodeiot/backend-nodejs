const {Router} = require('express');
const expressAsyncHandler = require("express-async-handler");

const userRouter = Router();
let users = []

userRouter.post('/register', expressAsyncHandler(async(req, res)=> { 
    const {email, password, passwordConfirm, name} = req.body

    if (!email || !password) return res.status(400).send({message: 'EMAIL E SENHA OBRIGATÓRIOS'})

    if(!email.includes('@')) return res.status(400).send({message: 'EMAIL NÃO VÁLIDO'})
    
    if(password != passwordConfirm) return res.status(400).send({ message: 'SENHA CONFIRMADA'})

    if(users.some(item=> item.email == email)) return res.status(400).send({ message: 'EMAIL CADASTRADO' })

    users.push({email, password})
    console.log(users)

    return res.status(200).send({message: `Usuário com e-mail: ${email} CRIADO COM SUCESSO!`})
}));

    userRouter.post('/login', expressAsyncHandler(async (req, res)=> {
    const {email, password } = req.body

    if (!email || !password) return res.status(400).send({message: 'EMAIL E SENHA OBRIGATÓRIOS'})

    const user = users.find(item => item.email == email)
    console.log(user)
    
    if(!user) return res.status(400).send({ message: 'usuário não encontrado' })
    
    if(user.password != password) return res.status(400).send({message: 'senha inválida'})

    const { password: passwordRemoved, ...result} = user
    return res.status(200).send({ user: user, message: 'login realizado com sucesso', user: result})
}))

module.exports = userRouter;
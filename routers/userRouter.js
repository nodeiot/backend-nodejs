const { Router } = require('express')
const expressAsyncHandler = require('express-async-handler');

const userRouter = Router();
let users = []

userRouter.post('/register', expressAsyncHandler(async (req, res)=> {
    const { email, password, passwordConfirm, name } = req.body
    if(!email || !password) return res.status(400).send({message: 'Email e senha inválidos, tente novamente'})
    if(!email.includes('@')) return res.status(400).send({message: 'Email não é válido'})
    if(password != passwordConfirm) return res.status(400).send({message: 'Senhas estão diferentes, tente novamente.'})
    if (users.some(item=> item.email == email)) return res.status(400).send({message: 'Email já está cadastrado.'})
    console.log ({email, password})
    users.push({ email, password })
    return res.status(200).send({message: `Usuário com email: ${email} criado com sucesso`})
}))

userRouter.post('/login' , expressAsyncHandler(async (req, res)=>{
    const { email, password} = req.body
    if (!email || !password) return res.status(400).send({ message: 'Email e senha são obrigatórios'})
    const user = user.find(item => item.email == email)
    if (!user) return res.status(400).send({message: 'Usuário não encontrado'})
    if(user.password != password) return res.status(400).send({message: "Senha inválida"})
    const { password: passwordRemoved, ...result } = user
    return res.status(200).send({user:user, message: 'Login realizado com sucesso'})
}))

module.exports = userRouter 
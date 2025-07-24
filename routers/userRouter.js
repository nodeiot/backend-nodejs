const { Router }  = require('express') //importa a funçã oda biblioteca express
const expressAsyncHandler = require ('express-async-handler');

const userRouter = Router();
let users = []

userRouter.post('/register', expressAsyncHandler (async (req, res) =>{
    const { email, password, passwordConfirm, name } = req.body
    if(!email || !password) return res.status(400).send({message: `Email e senha são obrigatórios`})
    if (users.some(item=> item.email == email)) return res.status(400).send({ message: 'Email já cadastrado' })
    if(!email.includes('@')) return res.status(400).send({ message: 'Email não é válido'})
    if(password != passwordConfirm) return res.status(400).send({ message: 'As duas senhas são diferentes' })
    users.push({ email, password, name })
    return res.status(200).send({message: `Usuário com e-mail: ${email} criado com sucesso` })
}))

userRouter.post ('/login', expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).send({ message: 'Email e senha são obrigatórios' })
    const user = users.find(item => item.email == email)
    
    if(!user) return res.status(400).send({ message: 'Usuário não encontrado'})
    if(user.password != password) return res.status(400).send({message: 'Senha inválida' })
    
    const { password : passwordRemoved, ...result} = user 
    return res.status(200).send({ message: 'Usuário logado com sucesso!', user: result })
}))

module.exports = userRouter
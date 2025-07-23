const {Router} = require ('express')
const expressAsyncHandler = require ('express-async-handler');

const userRouter = Router();
let users = []


userRouter.post ('/register', expressAsyncHandler(async (req, res)=> {
    const { email, password, passwordConfirm, name } = req.body
    if (!email || !password) return res.status(400).send({message: 'Email e senha são obrigatórios'})

    if (!email.includes('@')) return res.status(400).send({message: 'Email não é valido'})
    if (password != passwordConfirm)  if (!email.includes('@')) return res.status(400).send({message: 'Senha e confirmação são diferentes'})
    if (users.some(item => item.email == email)) return res.status(400).send({message: 'Email ja cadastrado'})
   
    users.push({email, password, name})
    console.log(users)
    return res.status(200).send({message: `Usuário com email: ${email} criado com sucesso`})
}))

userRouter.post ('/login', expressAsyncHandler(async (req, res)=> {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).send({message: 'Email e senha são obrigatórios'})
    const user = users.find(item => item.email == email)
    if (!user) return res.status(400).send({message: 'Usuário não encontrado'})
    const {password: passwordRemoved , ...result} = user
    return res.status(200).send({message: 'usuario logado com sucesso', user: result })
}))

module.exports = userRouter
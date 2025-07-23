const { Router } = require('express')
const expressAsyncHandler = require('express-async-handler');

const userRouter = Router();
let users = []

userRouter.post('/register',expressAsyncHandler(async (req, res)=>{
    const {email, password, passwordConfirm, name} = req.body
    if (!email || !password) return res.status(400).send({message: `Email e senha são obrigatórios`}) //verificar requisicao se veio completa

    if(password != passwordConfirm) return res.status(400).send({message: `A senha e a confirmacao da senha precisam ser as mesmas`})

    if (users.some(item => item.email == email)) return res.status(400).send({message: `Email já cadastrado, favor tentar com outro`}) //verificar duplo cadastro

    users.push({email, password, name})
    console.log(users)
 

    return res.status(200).send({message: `Usuário ${name} com e-mail: ${email} e senha: ${password} criado com sucesso`});
}))


userRouter.post('/login', expressAsyncHandler(async (req, res)=>{
    const {email, password} = req.body
    if (!email || !password) return res.status(400).send({message: `Email e senha são obrigatórios`})

    const user = users.find(item => item.email == email)
    console.log(user)

    if(!user) return res.status(400).send({message: `Usuário não encontrado`})

    if(user.password != password) return res.status(400).send({message: `Senha inválida`})

    const {password: passwordRemoved, ...result} = user
    return res.status(200).send({message: `Usuário logado com sucesso!`, user: result})
}))


module.exports = userRouter 
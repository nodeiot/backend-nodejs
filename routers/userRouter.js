const Router = require('express');
const expressAsyncHandler = require('express-async-handler');

const userRouter = Router();

let users = []
userRouter.post('/register', expressAsyncHandler( async (req, res) =>{
    const {email, password, confirmPassword, name} = req.body;
    if(!email || !password || !confirmPassword){
        return res.status(400).send({message: 'E-mail e senha são obrigatorios'})
    }
    if(password != confirmPassword){
        return res.status(400).send({message: 'As senhas não são iguais'})
    }
    if(!email.includes('@')){
        return res.status(400).send({message: 'E-mail invalido'})
    }
    if(users.some(item => item.email == email)){
        return res.status(400).send({message: 'E-mail já cadastrado'})
    }
    users.push({email, password})
    console.log(users);
    return res.status(200).send({message: `Usuário com e-mail ${email} criado com sucesso`})
}))


userRouter.post('/login', expressAsyncHandler( async (req, res) =>{
   const {email, password} = req.body;
   if(!email || !password){
        return res.status(400).send({message: 'E-mail e senha são obrigatorios!'})
    }
    const user = users.find(item => item.email == email)
    if(!user){
        return res.status(400).send({message: 'Usuário não cadastrado!'})
    }
    if(user.password != password){
        return res.status(400).send({message: 'Senha invalida!'})
    }
     const {password: passwordToDelete, ...result} = user
    return res.status(200).send({user: result, message: 'Login realizado com sucesso!'})
}))

module.exports = userRouter
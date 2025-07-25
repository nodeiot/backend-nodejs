
const {Router} = require('express');
const expressAsyncHandler = require("express-async-handler");
const User = require('../models/userModel'); //o user recebe o schema, podemos colar o schema ali, mas ficaria menos desorganizado
const { generateToken, isAuth } = require('../util'); //importa token, como usamos chaves as duas tem que estar igual

const userRouter = Router(); //a rota do usuário

userRouter.post('/register', expressAsyncHandler(async(req, res)=> { //esta criando

    try{ //sempre terá try e catch
        const {email, password, passwordConfirm, name} = req.body //pq declarar a const, para tal rota é necessario, para utilizar tem que usar 
        // o email, etc. tendo requisição e body.

        // || é diferente 

        if (!email || !password) return res.status(400).send({message: 'EMAIL E SENHA OBRIGATÓRIOS'}) //se email for diferente de senha retorna o erro

        if(!email.includes('@')) return res.status(400).send({message: 'EMAIL NÃO VÁLIDO'}) //se não tiver arroba não valida
        
        if(password != passwordConfirm) return res.status(400).send({ message: 'SENHA não confirmada, senhas diferentes'}) //
        //funciona por conta do return, se não tivesse, não funcionava

        const user = await User.create({  //pode usar o nome diferente, mas sempre tendo um padrão
            //User é diferente de user, User é a variavel da função
            //declarando  a const user, dizendo que ela recebe aguardando await, TEM que ter para funcionar async(req, res)=>
            email,
            password, //as variaveis 
            name
        });

        return res.status(200).send({message: `Usuário: ${user.name} CRIADO COM SUCESSO!`}) //user é pegar a função, as info

    }catch(error){ //sempre retornar algo, de preferência o erro

        return res.status(400).send(error) //retorna o erro
    }

}));

    userRouter.post('/login', expressAsyncHandler(async (req, res)=> { //em vez de criar, estamos buscando

    try{
        const {email, password } = req.body

        if (!email || !password) return res.status(400).send({message: 'EMAIL E SENHA OBRIGATÓRIOS'})

        const user = await User.findOne({ email: email }).lean() //encontando o usuário pelo e-mail 

        if(!user) return res.status(400).send({ message: 'usuário não encontrado' })
        
        if(user.password != password) return res.status(400).send({message: 'senha inválida'})

        const { password: passwordRemoved, ...result} = user //fazemos isso para que o usuário não veja a senha, pois ela poderia voltar para a tel
        //

        const token = generateToken(user) 
        //executa a função com os parametros do usuário, verifica se é aquele usuário, se esta liberado, etc

        return res.status(200).send({ user: {...result, token}, message: 'login realizado com sucesso'})

    }catch(error){
        return res.status(400).send(error)
    }
}))

userRouter.post('/update', isAuth,  expressAsyncHandler(async (req, res)=> {

    try{
        const {_id} = req.user
        const {newName} = req.body.name;

        const user = await User.findById(_id)
        user.name = newName

        const userUpdate = await user.save()

        console.log(user)

        return res.status(200).send({message: "usuário atualizado com sucesso" })

    }catch(error){
        res.status(400).send({message: 'sem token'})
    }
}))

module.exports = userRouter;
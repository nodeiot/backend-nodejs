const { Router } = require('express') //importa a função da biblioteca express
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
const { generateToken, isAuth } = require ('../utils.js');

const userRouter = Router();

userRouter.post('/register', expressAsyncHandler(async (req, res) => {

    try {
        const { email, password, passwordConfirm, name } = req.body
        if (!email || !password) return res.status(400).send({ message: `Email e senha são obrigatórios` })

        if (!email.includes('@')) return res.status(400).send({ message: 'Email não é válido' })
        if (password != passwordConfirm) return res.status(400).send({ message: 'As duas senhas são diferentes' })
        const user = await User.create({
            email,
            password,
            name
        })
        console.log(user)
        return res.status(200).send({ message: `Usuário ${user.name} criado com sucesso` })
    } catch (error) {
        return res.status(400).send(error)
    }
}))

userRouter.post('/login', expressAsyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) return res.status(400).send({ message: 'Email e senha são obrigatórios' })

        const user = await User.findOne({ email: email }).lean()

        if (!user) return res.status(400).send({ message: 'Usuário não encontrado' })
        if (user.password != password) return res.status(400).send({ message: 'Senha inválida' })

        const { password: passwordRemoved, ...result } = user

        const token = generateToken (user)

        return res.status(200).send({ user: {...result, token}, message: 'Usuário logado com sucesso!'})
    } catch (error) {
        return res.status(400).send(error)
    }
}))

userRouter.post('/update', isAuth, expressAsyncHandler(async (req, res) => {
    try {
        const { _id} = req.user
        const { newName } = req.body
        const user = await User.findById(_id)
        user.name = newName
        const userUpdated = await user.save()

        console.log(_id, newName)
        return res.status(200).send({ message: "Usuário atualizado com sucesso!"})
    } catch {
        return res.status(400).send({ message: error})
    }
}))

module.exports = userRouter
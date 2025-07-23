const { Router } = require('express');
const expressAsyncHandler = require('express-async-handler');

const userRouter = Router(); 
let users = [];

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const { email, password, confirmPassword, name } = req.body;

    if (!email || !password) { return res.status(400).send({ message: 'Email e senhas são obrigatórios' });}

    if (!email.includes('@')) { return res.status(400).send({ message: 'Email inválido' });}

    if (users.some(user => user.email === email)) { return res.status(400).send({ message: 'Email já cadastrado' });}

    if (password != confirmPassword) { return res.status(400).send({ message: 'Senhas diferentes' });}
    users.push( { email, password, name } );
    
    return  res.status(200).send({ message: `Usuário com email: ${email} criado com sucesso`  });

}));

userRouter.post('/login', expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) { return res.status(400).send({ message: 'Email e senhas são obrigatórios' });}

    const user = users.find(item => item.email == email);
    console.log(user);

    if (!user) return res.status(400).send({ message: 'Usuário não encontrado' });

    if (user.password != password) return res.status(400).send({ message: 'Senha incorreta' });

    const { password: passwordRemoved, ...result } = user;
    return res.status(200).send({ user: user, message: 'Usuário logado com sucesso', user: result });
    
}))

module.exports = userRouter; 


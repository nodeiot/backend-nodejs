const jwt = require('jsonwebtoken') //importa o json para o token

const segredo = "naocontapraninguem" //o segredo, a chave do segredo

const generateToken = (user) =>{

    return jwt.sign({ //so vai liberar o token se tiver o segredo

        _id: user._id,  //compara se é o mesmo usuário que esta neste ID
        email: user.email

    }, segredo, //retorna o token 
    //tal segredo é igual para todos 

        {
            expiresIn: '1d' //expira o token, apenas para o acesso
        }
    )
}

const isAuth = (req, res, next)=> {

    const authorization = req?.headers?.authorization || req?.headers?.Authorization  //tem req? tem aquisição? tem headers?
    //buscar da requisição o padrão da authorization
    //sem authoration não tem token

    if(authorization){

        const token = authorization.slice(7, authorization.length) //sete caractheres que tiramos
        jwt.verify(token, segredo, (err, decode) => {

            if(err){

                res.status(401).send({message: "token inválido"})

            }else{
                req.user = decode; //o que vem dentro do decode, todas as info que vem dentro do token, pegando o que montamos no segredo e desmontando
                next()
            }
        })
    }else{
        return res.send({message: "sem token"})
    }
}

module.exports = { generateToken, isAuth } //as chaves
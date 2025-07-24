const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';

const generateToken = (user) => {
   
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret, 
        {
            expiresIn: '1d'
        }
    )
} 


const isAuth = (req, res, next) => {
    const authorization = req?.headers?.authorization || req?.headers?.Authorization 
    if (authorization) {
        const token = authorization.slice(7, authorization.length)
        jwt.verify(token, secret, (err, decode) => {
            if (err) {
                res.status(401).send({ message: "Token inválido" })
            } else {
                req.user = decode
                next()
            }
        })

    } else {
        return res.send({message:"Sem Token"})
    }

}

module.exports = { generateToken, isAuth }
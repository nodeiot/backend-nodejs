const jwt = require('jsonwebtoken');

const segredo = "naocontapraninguem"

const generateToken = (user) => {
    const token = jwt.sign({
        _id: user._id,
        email: user.email
    }, segredo,
        {
            expiresIn: '1d'
        }
    )
};

const isAuth = (req, res) => {
   
    const token = req?.headers?.authorization || req?.headers?.Authorization
    if (authorization) {
        const token = authorization.slice(7, authorization.length)
        jwt.verify(token, segredo, (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Token inválido' });
            } else {
                req.user = decode;
                next();
            }
        })
    } else {
        return res.send({ message: "Sem token" })
    }
};
module.exports = { generateToken, isAuth };
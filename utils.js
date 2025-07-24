const jwt = require('jsonwebtoken')

const segredo = "naocontapraninguem"

const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, segredo,
        {
            expiresIn: '1d'
        }
    )
}

module.exports = { generateToken }
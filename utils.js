const jwt = require("jsonwebtoken");

const secret = "naocontapraninguem";

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret,
    {
      expiresIn: "1d",
    }
  );
};
req ={

}

const auth = (req, res, next) => {
  const authToken = req.headers?.authorization || req.headers?.Authorization;
  if (authToken) {
    const token = authToken.slice(7, authToken.length)
    jwt.verify(token, secret, (err, decode) => {
      if(err){
        req.status(401).send({message: "Token Invalido"})
      } else{ 
        req.user = decode;
        next()
      }
    })
  } else {
    return res.send({ message: "sem token" });
  }
};

module.exports = { generateToken, auth };

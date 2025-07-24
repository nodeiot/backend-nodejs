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
      expiresIn: '1d',
    }
  );
};

module.exports = {generateToken}
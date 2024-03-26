const jwt = require("jsonwebtoken");

function generateJWT(user) {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
}

module.exports = { generateJWT };

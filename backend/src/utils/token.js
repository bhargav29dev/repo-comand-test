const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function generateAccessToken(payload) {
  return jwt.sign(
    {
      ...payload,
      jti: crypto.randomUUID(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
      algorithm: "HS256",
    }
  );
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, {
    algorithms: ["HS256"],
  });
}

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};

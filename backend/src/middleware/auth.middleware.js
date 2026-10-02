const { verifyAccessToken } = require("../utils/token");
const { isDenylisted } = require("../data/tokenDenylist");
const { findUserById } = require("../data/users");

function extractBearerToken(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return { error: { status: 401, message: "Authorization header required" } };
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1]) {
    return { error: { status: 401, message: "Bearer token required" } };
  }

  return { token: parts[1] };
}

async function authenticateToken(req, res, next) {
  const { token, error } = extractBearerToken(req);

  if (error) {
    return res.status(error.status).json({ message: error.message });
  }

  try {
    const decoded = verifyAccessToken(token);

    if (isDenylisted(decoded.jti)) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    const user = findUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    req.user = decoded;
    req.currentUser = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Access token expired" });
    }

    return res.status(401).json({ message: "Invalid access token" });
  }
}

module.exports = {
  authenticateToken,
};

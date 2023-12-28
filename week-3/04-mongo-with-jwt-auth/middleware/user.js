const { User } = require("../db");
const jwt = require("jsonwebtoken");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const bearerToken = req.headers.authorization;
  if (!bearerToken) res.status(403).json({ error: "No token" });
  if (!/^Bearer/.test(bearerToken))
    return res.status(403).json({ error: "Not a Bearer Token" });
  const jwtToken = bearerToken.split(" ")[1];
  let payload = "";
  try {
    payload = jwt.verify(jwtToken, "secret");
    const user = await User.findById(payload.userId);
    if (!user) return res.sendStatus(404);
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid Token" });
    return;
  }
}

module.exports = userMiddleware;

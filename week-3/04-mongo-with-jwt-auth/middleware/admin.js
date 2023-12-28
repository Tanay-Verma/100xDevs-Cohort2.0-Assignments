const jwt = require("jsonwebtoken");
const { Admin } = require("../db");
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const bearerToken = req.headers.authorization;
  if (!bearerToken) res.status(403).json({ error: "No token" });
  if (!/^Bearer/.test(bearerToken))
    return res.status(403).json({ error: "Not a Bearer Token" });
  const jwtToken = bearerToken.split(" ")[1];
  let payload = "";
  try {
    payload = jwt.verify(jwtToken, "secret");
    const admin = await Admin.findById(payload.adminId);
    if (!admin) return res.sendStatus(404);
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid Token" });
    return;
  }
}

module.exports = adminMiddleware;

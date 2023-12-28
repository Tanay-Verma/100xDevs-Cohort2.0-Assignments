const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
//   console.log(req.headers)
  const admin = await Admin.findOne({
    username: req.headers.username,
    password: req.headers.password,
  });
  if(admin){
    next();
  }
  else{
    res.sendStatus(404);
  }
}

module.exports = adminMiddleware;

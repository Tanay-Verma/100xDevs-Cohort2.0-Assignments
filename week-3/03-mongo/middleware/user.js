const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const user = await User.findOne({
        username: req.headers.username,
        password: req.headers.password,
      });
      if(user){
        next();
      }
      else{
        res.sendStatus(404);
      }
}

module.exports = userMiddleware;
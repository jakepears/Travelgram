const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    console.log(authorization);
    res.status(401).json({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  //somehow useless
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    //verified token
    if (err) {
      return res.status(401).json({ error: "you must logged in" });
    }
    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
      //go to next only if verified and after the userdata is passed
    });
  });
};

const User = require("../models/User");

module.exports = async (req, res, next) => {
  const email = req.headers["x-user-email"];

  if (!email)
    return res.status(401).json("Not authenticated");

  const user = await User.findOne({ email });

  if (!user)
    return res.status(401).json("User not found");

  req.user = user;
  next();
};

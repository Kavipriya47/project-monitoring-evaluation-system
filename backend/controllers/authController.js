const User = require("../models/User");

exports.googleLogin = async (req, res) => {
  const { name, email } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      role: "student"
    });
  }

  res.json(user);
};

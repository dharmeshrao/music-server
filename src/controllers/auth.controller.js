const User = require("../models/artist.model")
const jwt = require("jsonwebtoken");
const newToken = (user) => {
  return jwt.sign({ user }, "Dharmesh");
};
const registor = async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send({ message: "user already exist" });
    user = await User.create(req.body);
    console.log(user);
    const token = newToken(user);
    console.log(token);
    return res.status(201).send({ user, token });
  } catch (err) {
    return res.status(400).send({ err: err.message });
  }
};

const login = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send("please check email or password");
    const match = user.checkPassword(req.body.password);
    if (!match) return res.status(400).send("check email or password");
    const token = newToken(user);
    return res.status(201).send({ user, token });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = { registor, login };

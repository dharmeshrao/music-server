const jwt = require("jsonwebtoken");
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "Dharmesh", (err, user) => {
      if (err) return reject(err);
      return resolve(user);
    });
  });
};

const authenticate = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  console.log(bearerToken);
  if (!bearerToken || !bearerToken.startsWith("Bearer "))
    return res.status(400).send("please provide valid Bearer token");
  const token = bearerToken.split(" ")[1];
  try {
    const { user } = await verifyToken(token);
    console.log(user);
    req.user = user;
    return next();
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = authenticate;
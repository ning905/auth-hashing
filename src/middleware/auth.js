const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");

const auth = async (req, res, next) => {
  const [_, token] = req.get("Authorization").split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    req.thisUser = user;
  } catch (err) {
    return res.json({ msg: err });
  }

  next();
};

module.exports = auth;

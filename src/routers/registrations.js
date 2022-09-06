const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");

router.post("/", async (req, res) => {
  // Get the username and password from request body
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      password: hash,
    },
  });
  res.status(201).json({ user: { username: user.username, id: user.id } });
  // Save the user using the prisma user model, setting their password to the hashed version
  // Respond back to the client with the created users username and id
});

module.exports = router;

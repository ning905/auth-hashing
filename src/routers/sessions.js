const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  // Get the username and password from the request body
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  // Check that a user with that username exists in the database
  // Use bcrypt to check that the provided password matches the hashed password on the user
  // If either of these checks fail, respond with a 401 "Invalid username or password" error
  const token = jwt.sign({ username }, process.env.JWT_SECRET);
  // If the user exists and the passwords match, create a JWT containing the username in the payload
  // Use the JWT_SECRET environment variable for the secret key
  res.json({ token });
  // Send a JSON object with a "token" key back to the client, the value is the JWT created
});

module.exports = router;

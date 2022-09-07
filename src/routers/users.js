const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma.js");

router.delete("/:id", async (req, res) => {
  try {
    if (req.thisUser.role === "ADMIN") {
      await prisma.user.delete({
        where: { id: Number(req.params.id) },
      });

      return res.json({ msg: "ok" });
    }
    res.json({ msg: "You are not an admin" });
  } catch (err) {
    res.json({ msg: err });
  }
});

module.exports = router;

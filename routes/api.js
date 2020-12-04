const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const controller = require("../controllers/user");
const authenticateJWT = require("../middlewares/auth")
router.post("/register", controller.register);


router.post("/login", controller.signin);

router.get("/home", [authenticateJWT], (req, res) => {
  res.send('Hello')
});

router.get("/products", (req, res) => {
});

router.post("/products", (req,res) => {
  
})

router.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = router;

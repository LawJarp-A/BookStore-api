const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const controller = require("../controllers/user");
const authenticateJWT = require("../middlewares/auth");
const uuid = require("uuid");

const Product = require("../models/Products");
const User = require('../models/User');


router.post("/register", controller.register);

router.post("/login", controller.signin);

router.get("/home", [authenticateJWT], (req, res) => {
  res.send("Hello");
});

router.get("/users", [authenticateJWT], (req, res) => {
  User.findById(req.user.id,function (err, user) {
    if (err) return console.error(err);
    res.send(user);
  });
});

router.get("/products", (req, res) => {
  Product.find(function (err, products) {
    if (err) return console.error(err);
    res.send(products);
  });
});

router.post("/products", [authenticateJWT], (req, res) => {
  const product = new Product({
    product_name: req.body.product_name,
    product_id: uuid.v4(),
    price: req.body.price,
    years_used: req.body.years_used,
    subject: req.body.subject,
    seller: req.body.seller,
  });
  product.save((err, product) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res.status(200).send({ product });
    }
  });
});

router.delete("/products", (res, req) => {});

router.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = router;

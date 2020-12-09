const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const controller = require("../controllers/user");
const authenticateJWT = require("../middlewares/auth");
const uuid = require("uuid");

const Product = require("../models/Products");
const User = require('../models/User');
const Offer = require('../models/Offers');
const Review = require('../models/Review');


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

router.post("/offers", [authenticateJWT], (req,res) =>{
  console.log(req.data)
  const offer = new Offer({
    seller_email: req.body.seller_email,
    buyer_email: req.body.buyer_email,
    product_id: req.body.product_id,
  });
  offer.save((err, offer) => {
    console.log('saved')
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res.status(200).send({ offer });
    }
  });
})

router.get("/offers", [authenticateJWT], (req, res) => {
  User.findById(req.user.id,function (err, user) {
    if (err) return console.error(err);
    Offer.find({seller_email: user.email}, function(err, offers){
      console.log(offers)
      if (err) return console.error(err);
      res.send(offers)

    })
  });

});

router.get("/products", (req, res) => {
  Product.find({}, function(err, products) {
    if (err) return console.error(err);
    res.send(products);
  });
});

router.post("/products", [authenticateJWT], (req, res) => {
  User.findById(req.user.id,function (err, user) {
    if (err) return console.error(err);
    const product = new Product({
      product_name: req.body.product_name,
      product_id: uuid.v4(),
      price: req.body.price,
      years_used: req.body.years_used,
      subject: req.body.subject,
      seller: user.email,
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
  
});

router.delete("/products", (res, req) => {});

router.get("/", (req, res) => {
  res.send("Hello");
});

router.get("/reviews", (req,res) => {
  Review.find({}, (err, reviews) => {
    if (err)return  console.error(err);
    res.send(reviews);
  });
});

router.post('/reviews', (req, res) => {
  const rev = new Review({
    product_name: req.body.product_name,
    author_name: req.body.author_name,
    date_of_review: req.body.date_of_review,
    reviewer_id: req.body.reviewer_id,
    comment: req.body.comment,
  });
  rev.save((err, review) => {
    if(err) {
    res.status(500).send({message: err});
    } else {
      res.status(200).send({message: review});
    }
  });
});
module.exports = router;
const express = require("express");
const router = express.Router();
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const mongoose = require("mongoose");

const userCredentialsSchema = require("../models/usercredentials");
userCredentialsSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userCredentialsSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.post("/register", function (req, res) {
    console.log(req.body)
  User.register({ username: req.body.username }, req.body.password, function (
    err,
    user
  ) {
    if (err) {
      res.send({err});
    } else {
      passport.authenticate("local")(req, res, function () {
        res.send({user})
      });
    }
  });
});

router.post("/login", function(req, res){

    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
  
    req.login(user, function(err){
      if (err) {
        res.send({err});
      } else {
        passport.authenticate("local")(req, res, function(){
          res.send(user)
        });
      }
    });
  
  });

router.get("/home", (req, res) => {
    if (req.isAuthenticated()) {
        //Do stuff
    } else {
        res.send({error: true})
    }
});

router.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = router;

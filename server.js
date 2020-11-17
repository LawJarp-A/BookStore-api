const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const routes = require("./routes/api");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

require("dotenv").config();

app.use(express.static("public"));
app.use(bodyParser.json());

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//connect to the database
mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

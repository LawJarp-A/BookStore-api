const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
const bodyParser = require("body-parser");
const routes = require("./routes/api");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();

app.use(express.static("public"));
app.use(bodyParser.json());


//connect to the database
mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

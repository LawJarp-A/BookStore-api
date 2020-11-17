const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const userCredentialsSchema = new Schema({
  name: String,
  email: String,
  password: String
})

module.exports = userCredentialsSchema;
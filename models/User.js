const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  rating: {type: Number, default: 1},
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

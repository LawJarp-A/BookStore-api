const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  product_id: { type: String, unique: true, required: true },
  price: { type: String, required: true },
  years_used: { type: String, required: true },
  subject: { type: String, required: true },
  seller: { type: String, required: true },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;

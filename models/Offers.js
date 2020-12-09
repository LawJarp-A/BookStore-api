const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
    seller_email: { type: String, required: true},
    buyer_email: { type: String, required: true},
    product_id: { type: String, required: true},
});

const Offer = mongoose.model("Offer", OfferSchema);
module.exports = Offer;

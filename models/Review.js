const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    product_id: {type: String, unique: true, required: true},
    product_name: {type: String, required: true},
    reviewer_email: {type: String, unique: true, required: true},
    comment: {type: String, required: true}
});

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;

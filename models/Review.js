const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    product_id: {type: String, required: true},
    product_name: {type: String},
    reviewer_email: {type: String,required: true},
    comment: {type: String, required: true}
});

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;

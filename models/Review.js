const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    product_name: {type: String, required: true},
    author_name: {type: String, required: true},
    date_of_review: {type: Date, required: true},
    reviewer_id: {type: String, unique: true, required: true},
    comment: {type: String, required: true}
});

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;

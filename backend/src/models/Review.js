const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    book: {
        type: mongoose.Schema.Types.ObjectId, ref: "Book",
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true
    } 

})

const Review = new mongoose.model("Review", reviewSchema);

module.exports = Review


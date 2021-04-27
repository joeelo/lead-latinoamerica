const mongoose = require("mongoose");
const User = require("./User")

const BookSchema = new mongoose.Schema({
    any: {
        type: {}
    },
    
    finished: {
        type: Boolean,
        default: false,
    },

    rating: {
        type: Number,
        default: 0
    },

    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },

    notes: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Note"
    }],

    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true
    },

    reviews: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Review"
    }]
})

const Book = new mongoose.model("Book", BookSchema);

module.exports = Book;
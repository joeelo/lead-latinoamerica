const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: [3, "name must be longer than that"],
        max: 22,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String, 
        required: true,
        unique: true
    }, 

    password: {
        type: String,
        required: true
    },

    books: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Book"
    }],

    reviews: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Review"
    }], 

    notes: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Note"
    }]

})

const User = new mongoose.model("User", userSchema);

module.exports = User;
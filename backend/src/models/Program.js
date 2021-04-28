const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({

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

const Program = new mongoose.model("Program", programSchema);

module.exports = Program


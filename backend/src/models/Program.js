const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
    organization: {
        type: String,
        required: true, 
    },
    bio: {
        type: String,
        max: 500, 
        required: true,
    },
    helpsWith: {
        type: Array, 
    }, 
    coverImage: {
        type: String, 
    },
    approved: {
        type: Boolean,
        default: false,
    }, 
    email: {
        type: String, 
        required: true,
    }, 
    tags: {
        type: Array, 
        default: []
    }, 
    href: {
        type: String, 
        required: true,
    }

})

const Program = new mongoose.model("Program", programSchema);

module.exports = Program


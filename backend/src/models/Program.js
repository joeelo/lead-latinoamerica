const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
    organization: {
        type: String,
        required: true, 
    },
    bio: {
        type: String,
        max: 200, 
        required: true,
    },
    content: {
        type: String, 
        default: '',
        max: 500
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
    }, 
    partnerUrl: {
        type: String,
    }

})

const Program = new mongoose.model("Program", programSchema);

module.exports = Program


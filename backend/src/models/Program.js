const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
    },
    content: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        max: 500, 
        required: true,
    },
    organization: {
        type: String, 
        required: true, 
    },
    helpsWith: {
        type: Array, 
    }, 
    coverImage: {
        type: String, 
    },
    tags: {
        type: Array,
    },


    // user: {
    //     type: mongoose.Schema.Types.ObjectId, ref: "User",
    //     required: true
    // } 

})

const Program = new mongoose.model("Program", programSchema);

module.exports = Program


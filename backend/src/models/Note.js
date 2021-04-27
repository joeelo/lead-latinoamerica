const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    }, 

    content: {
        type: String, 
        required: true
    },
    
    private: {
        type: Boolean,
        default: true
    },

    book: {
        type: mongoose.Schema.Types.ObjectId, ref: "Book",
    }, 

    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true
    },

    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }, 

    updated_at: {
        type: Date,
        default: Date.now
    }

})

const Note = new mongoose.model("Note", noteSchema);

module.exports = Note
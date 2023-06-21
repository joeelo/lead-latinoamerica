const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: [3, 'name must be longer than that'],
    max: 22,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  preferredName: {
    type: String,
  },

  pronouns: {
    type: String, 
  },

  nationality: {
    type: Array,
  },

  grade: {
    type: String,
  },

  interests: {
    type: Array,
  },

  savedPrograms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program', 
  }],
  
  savedProgramDates: {
    type: Array
  },

  isAdmin: {
    type: Boolean, 
    default: false,
  }
})

// @ts-ignore
const User = new mongoose.model('User', userSchema);

module.exports = User;

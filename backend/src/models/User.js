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

  nationality: {
    type: String,
  },

  gradeLevel: {
    type: Number,
  },

  Interests: {
    type: Array,
    required: false,
  },
});

const User = new mongoose.model('User', userSchema);

module.exports = User;

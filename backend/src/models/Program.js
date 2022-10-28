const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    max: 200,
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
  organization: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization', 
  }],
  tags: {
    type: Array,
    default: [],
  },
  href: {
    type: String,
    required: true,
  },
  partnerUrl: {
    type: String,
  },
  expirationDate: {
    type: String,
    required: true,
  }, 
  programType: {
    program: {
      type: Boolean,
      default: false,
    },
    summer: {
      type: Boolean,
      default: false,
    },
    internship: {
      type: Boolean,
      default: false,
    },
    scholarship: {
      type: Boolean,
      default: false,
    },
  },
});

const Program = new mongoose.model('Program', programSchema, 'programs');

module.exports = Program;

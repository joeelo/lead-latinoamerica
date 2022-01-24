const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
  organization: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    max: 200,
    required: true,
  },
  missionStatement: {
    type: String,
    default: '',
    max: 500,
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
    default: [],
  },
  href: {
    type: String,
    required: true,
  },
  partnerUrl: {
    type: String,
  },
  orgLogo: {
    type: String, 
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

const Organization = new mongoose.model('Organization', orgSchema, 'programs');

module.exports = Organization;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Business = new Schema({
  Name: {
    type: String
  },
  Phone: {
    type: Number
  },
  Email: {
    type: String
  },
  Job: {
    type: String
  }
},{
    collection: 'business'
});

module.exports = mongoose.model('Business', Business);
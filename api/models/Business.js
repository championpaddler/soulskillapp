const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  },
  Resume: {
    type: String
  }
},{
    collection: 'business'
});

module.exports = mongoose.model('Business', Business);
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ClassificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true }
  },
  description: {
  	type: String,
  },
  feeling:{
    type: String
  },
  type: {
    type: String,
    required: true
  },
  likes: [{ 
    type: Schema.ObjectId,
    ref: 'User'
  }]
},{timestamps: true});

module.exports = mongoose.model('Classification', ClassificationSchema);

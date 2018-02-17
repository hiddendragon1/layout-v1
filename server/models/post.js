const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const PostSchema = new mongoose.Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
  	type: String,
  	required: true
  },
  imgUrl:{
    type: String
  },
  likes: [{ 
    type: Schema.ObjectId,
    ref: 'User'
  }]
},{timestamps: true});

module.exports = mongoose.model('Post', PostSchema);

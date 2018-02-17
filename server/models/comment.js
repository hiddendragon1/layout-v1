const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ReplySchema = new mongoose.Schema ({
  text: {
    type: String,
    required: true
  },
  author_id:{
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{ 
    type: Schema.ObjectId,
    ref: 'User'
  }]
},{timestamps: true});

ReplySchema.add({replies: [ReplySchema]});

const CommentSchema = new mongoose.Schema({
  text: {
  	type: String,
  	required: true
  },
  post_id:{
    type: Schema.ObjectId,
    ref: 'Post',
    required: true
  },
  author_id:{
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{ 
    type: Schema.ObjectId,
    ref: 'User'
  }],
  replies: [ReplySchema]
},{timestamps: true});

module.exports = mongoose.model('Comment', CommentSchema);

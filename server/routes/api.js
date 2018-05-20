const express = require('express');
const multer  = require('multer');
const router = new express.Router();
const upload = multer({ dest: './public/static/' })
const { ObjectID } = require('mongodb');


//models
const Post = require('mongoose').model('Post');
const Comment = require('mongoose').model('Comment');
const User = require('mongoose').model('User');
const Reply = require('mongoose').model('Reply');
const Classification = require('mongoose').model('Classification');


//Dashboard route for authenticated user
router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "Welcome User"
  });
});

//GET all posts sorted by createdAt desc
router.get('/posts', (req, res) => {
  Post.aggregate([
      // { $match: { postId: ObjectID(postId)}},
      { $sort: { createdAt: -1}},
      { $lookup: {from:"users",localField:"author",foreignField:"_id", as:"author"}},
      { $project: { 
          title:1,
          imgUrl:1,
          author: { 
            $let: {
              vars: {firstUser: {$arrayElemAt: ["$author", 0]}},
              in: {name: "$$firstUser.name", email: "$$firstUser.email"}
            }
          },
          likes: { $size: "$likes" },
          comments: { $size: "$comments"}
        }
      }
    ])
  // Post.find().sort({ createdAt: -1 }).populate('author','name email bio')
    .then((posts) => {
      console.log(posts);
      res.send({ posts });
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
});

//GET a specific posts by id
router.get('/post/:id', (req, res) => {
  const postId= req.params.id;
  
  if(postId)
    Post.findById(postId)
      .sort({ createdAt: -1 })
      .populate('author','name email bio')
      .then((post) => {
        res.send({ post });
      })
      .catch((error) => {
        res.status(400).send({ error });
      });
  else
    return res.status(400).json({
        success: false,
        message: 'Post Id was not provided in API call'
      });
});

//GET all posts by user
router.get('/user/:id/posts', (req,res) => {
  
  const userId= req.params.id;
    
  if(userId)
    Post.aggregate([
          { $match: { author: ObjectID(userId)}},
          { $sort: { createdAt: -1}},
          { $lookup: {from:"users",localField:"author",foreignField:"_id", as:"author"}},
          { $project: { 
              title:1,
              imgUrl:1,
              author: { 
                $let: {
                  vars: {firstUser: {$arrayElemAt: ["$author", 0]}},
                  in: {name: "$$firstUser.name", email: "$$firstUser.email"}
                }
              },
              likes: { $size: "$likes" },
              comments: { $size: "$comments"}
            }
          }
        ])
      .then((posts) => {
        res.send({ posts });
      })
      .catch((error) => {
        res.status(400).send({ error });
      });
  else
    return res.status(400).json({
      success: false,
      message: 'User Id was not provided in API call'
    });

});

//GET comments for a post:id
router.get('/post/:id/comments', (req, res) => {
  //get the post id from get query param
  const postId= req.params.id;

  if(postId)
    Comment.aggregate([
        { $match: { postId: ObjectID(postId)}},
        { $sort: { createdAt: -1}},
        { $lookup: {from:"users",localField:"author",foreignField:"_id", as:"author"}},
        { $project: { 
            text:1,
            likes: {$size:"$likes"},
            replies:{$size:"$replies"},
            author: { 
              $let: {
                vars: {firstUser: {$arrayElemAt: ["$author", 0]}},
                in: {name: "$$firstUser.name", email: "$$firstUser.email"}
              }
            }
          }
        }
      ])
      .then((comments) => {
        res.send({ comments });
      })
      .catch((error) => {
        res.status(400).send({ error });
      });
  else
    return res.status(400).json({
        success: false,
        message: 'Post Id was not provided in API call'
      });
});

//GET comments by a user ID
router.get('/user/:id/comments', (req,res) => {
  
  const userId= req.params.id;
    
  if(userId)
    Comment.aggregate([
          { $match: {  $or: [ {author: ObjectID(userId)},{ replies: { author:ObjectID(userId)}}]}},
          { $sort: { createdAt: -1}},
          { $lookup: {from:"users",localField:"author",foreignField:"_id", as:"author"}},
          { $project: { 
              _id: 0,
              postId:1
            }
          }
      ])
      .then((posts) => {
        var temp = posts.map( x => ObjectID(x.postId));
        Post.aggregate([
          { $match: { _id: { $in: temp }}},
          { $sort: { createdAt: -1}},
          { $lookup: {from:"users",localField:"author",foreignField:"_id", as:"author"}},
          { $project: { 
              title:1,
              imgUrl:1,
              author: { 
                $let: {
                  vars: {firstUser: {$arrayElemAt: ["$author", 0]}},
                  in: {name: "$$firstUser.name", email: "$$firstUser.email"}
                }
              },
              likes: { $size: "$likes" },
              comments: { $size: "$comments"}
            }
          }
        ])
          .then((posts) => {
            res.send({ posts });
          })
          .catch((error) => {
            res.status(400).send({ error });
          });            
      })
      .catch((error) => {
        res.status(400).send({ error });
      });
  else
    return res.status(400).json({
        success: false,
        message: 'User Id was not provided in API call'
      });

});

//GET likes by a user ID
router.get('/user/:id/likes', (req,res) => {
  
  const userId= req.params.id;
    
  if(userId)
    // Comment.aggregate([
    //       { $match: {  $or: [ {author: ObjectID(userId)},{ replies: { author:ObjectID(userId)}}]}},
    //       { $sort: { createdAt: -1}},
    //       { $lookup: {from:"users",localField:"author",foreignField:"_id", as:"author"}},
    //       { $project: { 
    //           _id: 0,
    //           postId:1
    //         }
    //       }
    //   ])
    //   .then((posts) => {
    //     var temp = posts.map( x => ObjectID(x.postId));
        Post.aggregate([
          { $match: { likes:  ObjectID(userId) }},
          { $sort: { createdAt: -1}},
          { $lookup: {from:"users",localField:"author",foreignField:"_id", as:"author"}},
          { $project: { 
              title:1,
              imgUrl:1,
              author: { 
                $let: {
                  vars: {firstUser: {$arrayElemAt: ["$author", 0]}},
                  in: {name: "$$firstUser.name", email: "$$firstUser.email"}
                }
              },
              likes: { $size: "$likes" },
              comments: { $size: "$comments"}
            }
          }
        ])
        .then((posts) => {
          res.send({ posts });
        })
        .catch((error) => {
          res.status(400).send({ error });
        });            
  else
    return res.status(400).json({
        success: false,
        message: 'User Id was not provided in API call'
      });
});



//GET replies for a comment:id
router.get('/comment/:id/replies' , (req,res) => {
  const commentId = req.params.id;
  
  if(commentId)
    Comment.findById(commentId)
      .sort({ createdAt: -1 })
      .populate('replies.author','name email')
      
      .then((comment) => {
        res.send(comment.replies);
      })
      .catch((error) => {
        res.status(400).send({ error });  
      });
  else
    return res.status(400).json({
        success: false,
        message: 'Comment Id was not provided in API call'
      });

});


//POST to add a new post 
router.post('/post', upload.single('file'), (req, res) => {
  const post = new Post(req.body);
  const path = req.file.path.replace(/\\/g, "/");
  post.imgUrl = path.substring(path.indexOf('static')-1);

  console.log("post sdffsfsd",req.file);
  // post.save()
  //   .then((doc) => {
  //     // console.log(doc);
  //     res.send(doc);
  //   })
  //   .catch((error) => {
  //     res.status(400).send({ error });  
  //   });
  res.send(post);
});

//POST to add a new comment at the root post
//this comment serve as a parent for all reply to it comment
//push comment object id to Post
router.post('/comment', (req, res) => {
  const comment = new Comment(req.body);

  console.log("commentsdfsdfsdfsdf", comment);
  // comment.save()
  //   .then((comment) => {
  //     //update post with new comment id
  //     Post.findByIdAndUpdate(req.body.postId,{$addToSet: {comments:comment._id}},{new:true})
  //       // .populate('author','name email bio')
  //       .then((post) => {
  //         //TODO1: send back post res as well?
  //         res.send(comment);
  //       })
  //       .catch((error)=> {
  //         res.status(400).send({error});
  //       })
  //   })
  //   .catch((error) => {
  //     res.status(400).send({ error });  
  //   });
  res.send(comment);
});

//POST to add a like to a post
//TODO1: add dislike
router.post('/post/:id/like', (req,res) => {
  const postId = req.params.id;
  const userId = req.body.user;

  // console.log(req.body.user);
  Post.findByIdAndUpdate(postId, {$addToSet: {likes:userId}},{new:true})
    .then((post) => {
      res.send(post);
    })
    .catch((error)=> {
      res.status(400).send({error});
  });

});

//POST to add a new reply to a comment
//TODO1: add post api for reply to a reply. implement reply/:id/reply? 
//no we probably shouldnt implement reply of a reply.
router.post('/comment/:id/reply' , (req,res) => {
  const commentId = req.params.id;
  const reply = new Reply(req.body);

  // console.log(reply);
  Comment.findByIdAndUpdate(commentId, {$push: {replies:reply}},{new:true})
    .then((comment) => {
      // console.log(doc);
      res.send(comment);
    })
    .catch((error) => {
      res.status(400).send({ error });  
    });
});

router.post('/classification', (req,res) => {
  const classification = new Classification(req.body);

  classification.save()
    .then((doc) => {
      res.send(doc);
    })
    .catch((error)=> {
      res.status(400).send({error});
  });

});

//DELETE  call to delete post 
//TODO1: This need to be implemented
router.delete('/post', (req, res) => {
  const id = req.body.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({ error: 'Could not delete the Post because the ID is invalid.' });
  }
  
  Post.findByIdAndRemove(id)
    .then((Post) => {
      if (!Post) {
        return res.status(404).send({ error: 'Could not delete the Post because the ID does not exist.' });
      }
      res.send({ Post });
    })
    .catch((error) => {
      res.status(404).send({ error: 'Unable to delete the Post.' });
    });
});

/*Update API to edit Post TODO1 do we need any updating??*/
router.patch('/Post', (req, res) => {
 
  // const body = _.pick(req.body, ['text', 'completed']);
  const id = req.body.id;
  // console.log(req.params.id);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({ error: 'Could not update the Post because the ID is invalid.' });
  }

  Post.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then((Post) => {
      if (!Post) {
        return res.status(404).send({ error: 'Could not update the Post because the ID does not exist.' });
      }
      res.send({ Post });
    })
    .catch((error) => {
      res.status(400).send({ error: 'Unable to update the Post.' });
    });
});


module.exports = router;
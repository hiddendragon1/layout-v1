const express = require('express');
const multer  = require('multer');
const router = new express.Router();
const Post = require('mongoose').model('Post');
const upload = multer({ dest: './public/static/' })
const { ObjectID } = require('mongodb');

/*Dashboard route for authenticated user*/
router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "Welcome User"
  });
});

/*Post get API call to get Post list*/
router.get('/posts', (req, res) => {
  Post.find().sort({ createdAt: -1 }).populate('author','name')
    .then((Posts) => {
      res.send({ Posts });
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
});

/*Post post API call to add new post*/
router.post('/post', upload.single('file'), (req, res) => {
  const post = new Post(req.body);
  const path = req.file.path.replace(/\\/g, "/");
  post.imgUrl = path.substring(path.indexOf('static')-1);

  post.save()
    .then((doc) => {
      console.log(doc);
      res.send(doc);
    })
    .catch((error) => {
      res.status(400).send({ error });  
    });
});

/* Post delete API call to mongoDB*/
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

/*Update API to edit flashPost*/
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
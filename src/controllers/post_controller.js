import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();
  console.log(req.body.title);
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.cover_url = req.body.cover_url;
  post.content = req.body.content;
  post.author = req.user;
  post.authorName = req.user.username;
  console.log(req.user.username);
  console.log(req.user);

  post.save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });

  // res.send('post should be created and returned');
};

export const getPosts = (req, res) => {
  Post.find()
    .then((result) => { res.json(result); })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log('ERROR');
      res.status(500).json({ err });
    });
};

export const deletePost = (req, res) => {
  console.log('in DELETE post');
  Post.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
  // res.send('delete a post here');
};

export const updatePost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      post.title = req.body.title;
      post.tags = req.body.tags;
      post.content = req.body.content;
      post.cover_url = req.body.cover_url;
      post.author = req.user; // update the author to whoever new person is
      // eslint-disable-next-line arrow-body-style
      post.save().then(result => res.json(result));
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
  // res.send('update a post here');
};

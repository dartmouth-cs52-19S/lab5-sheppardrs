import { Router } from 'express';
import * as Posts from './controllers/post_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to our blog api!' });
});

// Routes
router.route('/posts')
  .get(Posts.getPosts)
  .post(Posts.createPost);

router.route('/posts/:id')
  .put(Posts.updatePost)
  .get(Posts.getPost)
  .delete(Posts.deletePost);


export default router;

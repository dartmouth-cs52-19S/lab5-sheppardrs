import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as Users from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to our blog api!' });
});

// Routes
router.route('/posts')
  .get(Posts.getPosts)
  .post(requireAuth, Posts.createPost);

router.route('/posts/:id')
  .put(requireAuth, Posts.updatePost)
  .get(Posts.getPost)
  .delete(requireAuth, Posts.deletePost);

router.route('/signin')
  .post(requireSignin, Users.signin);

router.route('/signup')
  .post(Users.signup);


export default router;

import { Router } from 'express';
import passport from 'passport';
import { createPost, deletePost, getPostById, getPosts, updatePost } from '../controller/post.controller';

const postRouter = Router();

postRouter.use(passport.authenticate('jwt', { session: false }));

postRouter.post('/', createPost);
postRouter.get('/', getPosts);
postRouter.get('/:id', getPostById);
postRouter.put('/:id', updatePost);
postRouter.delete('/:id', deletePost);

export default postRouter;

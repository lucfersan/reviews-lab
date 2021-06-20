import { Router } from 'express';
import { PostsController } from '../controllers/PostsController';

const postsRoutes = Router();
const postsController = new PostsController();

postsRoutes.post('/', postsController.create);
postsRoutes.get('/my', postsController.showMyPosts);
postsRoutes.get('/other', postsController.showOtherPosts);

export { postsRoutes };

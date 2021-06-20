import { Router } from 'express';

import { postsRoutes } from '@modules/posts/infra/routes/postsRoutes';
import { usersRoutes } from '@modules/users/infra/routes/usersRoutes';
import { reviewsRoutes } from '@modules/reviews/infra/routes/reviewsRoutes';
import { ensureAuthenticated } from '@modules/users/infra/middlewares/ensureAuthenticated';
import { sessionsRoutes } from '@modules/users/infra/routes/sessionsRoutes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/posts', ensureAuthenticated, postsRoutes);
routes.use('/reviews', ensureAuthenticated, reviewsRoutes);

export { routes };

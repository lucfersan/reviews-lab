import { Router } from 'express';
import { ReviewsController } from '../controllers/ReviewsController';

const reviewsRoutes = Router();
const reviewsController = new ReviewsController();

reviewsRoutes.post('/', reviewsController.create);
reviewsRoutes.get('/my', reviewsController.showMyReviews);
reviewsRoutes.get('/other', reviewsController.showOtherReviews);

export { reviewsRoutes };

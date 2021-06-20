import { CreateReviewService } from '@modules/reviews/services/CreateReviewService';
import { ShowMyReviewsService } from '@modules/reviews/services/ShowMyReviewsService';
import { ShowOtherReviewsService } from '@modules/reviews/services/ShowOtherReviews';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ReviewsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const author_id = request.user.id;

    const { post_id, content } = request.body;

    const createReview = container.resolve(CreateReviewService);

    const review = await createReview.execute({
      author_id,
      post_id,
      content,
    });

    return response.json(review);
  }

  public async showMyReviews(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;

    const showMyReviews = container.resolve(ShowMyReviewsService);

    const reviews = await showMyReviews.execute(user_id);

    return response.json(reviews);
  }

  public async showOtherReviews(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const except_user_id = request.user.id;

    const showOtherReviews = container.resolve(ShowOtherReviewsService);

    const reviews = await showOtherReviews.execute(except_user_id);

    return response.json(reviews);
  }
}

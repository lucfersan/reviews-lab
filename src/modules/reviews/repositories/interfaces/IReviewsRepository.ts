import { CreateReviewDTO } from '@modules/reviews/dtos/CreateReviewDTO';
import { Review } from '@prisma/client';

export interface IReviewsRepository {
  create(data: CreateReviewDTO): Promise<Review>;
  findMyReviews(user_id: string): Promise<Review[]>;
  findOtherReviews(except_user_id: string): Promise<Review[]>;
}

import { Review } from '@prisma/client';
import { prisma } from '@shared/infra/prisma/client';
import { CreateReviewDTO } from '../dtos/CreateReviewDTO';
import { IReviewsRepository } from './interfaces/IReviewsRepository';

export class ReviewsRepository implements IReviewsRepository {
  public async create(data: CreateReviewDTO): Promise<Review> {
    const review = await prisma.review.create({ data });
    return review;
  }

  public async findMyReviews(user_id: string): Promise<Review[]> {
    const reviews = await prisma.review.findMany({
      where: { author_id: user_id },
    });
    return reviews;
  }

  public async findOtherReviews(except_user_id: string): Promise<Review[]> {
    const reviews = await prisma.review.findMany({
      where: {
        author_id: {
          not: except_user_id,
        },
      },
    });
    return reviews;
  }
}

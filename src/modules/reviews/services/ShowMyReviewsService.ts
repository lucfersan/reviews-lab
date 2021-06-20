import { Review } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { IReviewsRepository } from '../repositories/interfaces/IReviewsRepository';

@injectable()
export class ShowMyReviewsService {
  constructor(
    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository,
  ) {}

  public async execute(user_id: string): Promise<Review[]> {
    const reviews = await this.reviewsRepository.findMyReviews(user_id);
    return reviews;
  }
}

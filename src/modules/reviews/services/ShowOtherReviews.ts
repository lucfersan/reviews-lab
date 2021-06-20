import { Review } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { IReviewsRepository } from '../repositories/interfaces/IReviewsRepository';

@injectable()
export class ShowOtherReviewsService {
  constructor(
    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository,
  ) {}

  public async execute(except_user_id: string): Promise<Review[]> {
    const reviews = await this.reviewsRepository.findOtherReviews(
      except_user_id,
    );
    return reviews;
  }
}

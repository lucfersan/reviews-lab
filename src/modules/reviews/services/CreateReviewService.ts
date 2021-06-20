import { inject, injectable } from 'tsyringe';
import { Review } from '@prisma/client';

import { IReviewsRepository } from '../repositories/interfaces/IReviewsRepository';
import { IPostsRepository } from '@modules/posts/repositories/interfaces/IPostsRepository';
import { IUsersRepository } from '@modules/users/repositories/interfaces/IUsersRepository';
import { HttpException } from '@shared/errors/HttpException';

type Request = {
  author_id: string;
  post_id: string;
  content: string;
};

@injectable()
export class CreateReviewService {
  constructor(
    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    author_id,
    post_id,
    content,
  }: Request): Promise<Review> {
    const user = await this.usersRepository.findById(author_id);

    if (!user) {
      throw new HttpException('User does not exist.', 404);
    }

    const post = await this.postsRepository.findById(post_id);

    if (!post) {
      throw new HttpException('Post does not exist.', 404);
    }

    if (post.author_id === user.id) {
      throw new HttpException('You cannot review your own post.', 401);
    }

    const review = await this.reviewsRepository.create({
      author_id,
      post_id,
      content,
    });

    return review;
  }
}

import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/interfaces/IUsersRepository';
import { UsersRepository } from '@modules/users/repositories/UsersRepository';

import { IPostsRepository } from '@modules/posts/repositories/interfaces/IPostsRepository';
import { PostsRepository } from '@modules/posts/repositories/PostsRepository';

import { IReviewsRepository } from '@modules/reviews/repositories/interfaces/IReviewsRepository';
import { ReviewsRepository } from '@modules/reviews/repositories/ReviewsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository,
);

container.registerSingleton<IReviewsRepository>(
  'ReviewsRepository',
  ReviewsRepository,
);

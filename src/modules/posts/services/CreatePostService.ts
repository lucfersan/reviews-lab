import { IUsersRepository } from '@modules/users/repositories/interfaces/IUsersRepository';
import { Post } from '@prisma/client';
import { HttpException } from '@shared/errors/HttpException';
import { inject, injectable } from 'tsyringe';
import { IPostsRepository } from '../repositories/interfaces/IPostsRepository';

type Request = {
  author_id: string;
  title: string;
  content: string;
};

@injectable()
export class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ author_id, title, content }: Request): Promise<Post> {
    const userExists = await this.usersRepository.findById(author_id);

    if (!userExists) {
      throw new HttpException('User does not exist.', 404);
    }

    const post = await this.postsRepository.create({
      author_id,
      title,
      content,
    });

    return post;
  }
}

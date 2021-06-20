import { Post } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { IPostsRepository } from '../repositories/interfaces/IPostsRepository';

@injectable()
export class ShowOtherPostsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(except_user_id: string): Promise<Post[]> {
    const posts = await this.postsRepository.findOtherPosts(except_user_id);
    return posts;
  }
}

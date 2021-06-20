import { Post } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { IPostsRepository } from '../repositories/interfaces/IPostsRepository';

@injectable()
export class ShowMyPostsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(user_id: string): Promise<Post[]> {
    const posts = await this.postsRepository.findMyPosts(user_id);
    return posts;
  }
}

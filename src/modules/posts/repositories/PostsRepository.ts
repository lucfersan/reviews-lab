import { Post } from '@prisma/client';
import { prisma } from '@shared/infra/prisma/client';
import { CreatePostDTO } from '../dtos/CreatePostDTO';
import { IPostsRepository } from './interfaces/IPostsRepository';

export class PostsRepository implements IPostsRepository {
  public async create(data: CreatePostDTO): Promise<Post> {
    const post = await prisma.post.create({ data });
    return post;
  }

  public async findById(id: string): Promise<Post | undefined> {
    const post = await prisma.post.findUnique({ where: { id } });
    return post;
  }

  public async findMyPosts(user_id: string): Promise<Post[]> {
    const posts = await prisma.post.findMany({ where: { author_id: user_id } });
    return posts;
  }

  public async findOtherPosts(except_user_id: string): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: {
        author_id: {
          not: except_user_id,
        },
      },
    });
    return posts;
  }
}

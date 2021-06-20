import { CreatePostDTO } from '@modules/posts/dtos/CreatePostDTO';
import { Post } from '@prisma/client';

export interface IPostsRepository {
  create(data: CreatePostDTO): Promise<Post>;
  findById(id: string): Promise<Post | undefined>;
  findMyPosts(user_id: string): Promise<Post[]>;
  findOtherPosts(except_user_id: string): Promise<Post[]>;
}

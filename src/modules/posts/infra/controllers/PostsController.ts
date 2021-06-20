import { CreatePostService } from '@modules/posts/services/CreatePostService';
import { ShowMyPostsService } from '@modules/posts/services/ShowMyPostsService';
import { ShowOtherPostsService } from '@modules/posts/services/ShowOtherPostsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class PostsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const author_id = request.user.id;

    const { title, content } = request.body;

    const createPost = container.resolve(CreatePostService);

    const post = await createPost.execute({ author_id, title, content });

    return response.json(post);
  }

  public async showMyPosts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const showMyPosts = container.resolve(ShowMyPostsService);

    const posts = await showMyPosts.execute(user_id);

    return response.json(posts);
  }

  public async showOtherPosts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const except_user_id = request.user.id;
    const showOtherPosts = container.resolve(ShowOtherPostsService);

    const posts = await showOtherPosts.execute(except_user_id);

    return response.json(posts);
  }
}

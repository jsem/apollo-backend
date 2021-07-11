import { DataSource } from 'apollo-datasource';
import { getRepository } from 'typeorm';
import Post from '../entity/Post';

/**
 * Datasource for getting post data
 */
export default class PostAPI extends DataSource {
  context: any;

  initialize(config: any) {
    this.context = config.context;
  }

  postReducer(post: Post) {
    return {
      id: post.id,
    }
  }

  /**
   * Find a Post with the given ID
   * @param id the id of the Post
   * @returns the Post with the given id
   */
  async getPost(id: number): Promise<Post | undefined> {
    return await getRepository(Post).findOne({
      where: {
        id: id
      }
    });
  }

  /**
   * Find all Posts
   * @returns all Posts
   */
  async getPosts(): Promise<Post[]> {
    return await getRepository(Post).find();
  }
}

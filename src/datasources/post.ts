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

  /**
   * Find a Post with the given identifier
   * @param identifier the identifier of the Post
   * @returns the Post with the given identifier
   */
  async getPost(identifier: string): Promise<Post | undefined> {
    return await getRepository(Post).findOne({
      where: {
        identifier: identifier
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

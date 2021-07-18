import { Connection, getRepository } from 'typeorm';
import { newDb, IBackup } from 'pg-mem';
import PostAPI from '../post';
import Post from '../../entity/post';
import { POST1, POST2 } from '../../entity/__fixtures__/post';

describe('[PostAPI.getPosts]', () => {
  let connection: Connection;
  let backup: IBackup;

  beforeAll(async () => {
    const db = newDb();
    connection = await db.adapters.createTypeormConnection({
      type: 'postgres',
      entities: [
        Post
      ]
    });
    await connection.synchronize();
    backup = db.backup();
  });

  afterAll(async () => {
    await connection.close();
  })

  afterEach(() => {
    backup.restore();
  })

  it('returns blank array when there are no posts', async () => {
    const posts = await new PostAPI().getPosts();
    expect(posts).toEqual([]);
  });

  it('returns posts found', async () => {
    await getRepository(Post).save([POST1, POST2]);

    const posts = await new PostAPI().getPosts();
    expect(posts.length).toBe(2);
  })
})
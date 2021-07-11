import { Connection, getRepository } from 'typeorm';
import { newDb, IBackup } from 'pg-mem';
import PostAPI from '../post';
import Post from '../../entity/post';

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

    await getRepository(Post).save([{
      identifier: 'test1',
      title: 'test title 1',
      summary: 'test summary 1',
      body: 'test body 1',
      createdOn: '2020-01-01 10:10:10+11:00',
      updatedOn: '2020-01-02 11:11:11+11:00',
      visible: false,
    },{
      identifier: 'test2',
      title: 'test title 2',
      summary: 'test summary 2',
      body: 'test body 2',
      createdOn: '2020-02-01 10:10:10+11:00',
      updatedOn: '2020-02-02 11:11:11+11:00',
      visible: false,
    }]);

    const posts = await new PostAPI().getPosts();
    expect(posts.length).toBe(2);
  })
})
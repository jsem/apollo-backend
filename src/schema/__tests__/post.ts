import { ApolloServer, gql } from 'apollo-server';
import { Connection, getRepository } from 'typeorm';
import { newDb, IBackup } from 'pg-mem';
import moment from 'moment';
import { typeDefs, resolvers } from '../index';
import PostAPI from '../../datasources/post';
import Post from '../../entity/post';
import { POST1, POST2 } from '../../entity/__fixtures__/post';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      identifier
      title
      body
      summary
      visible
      createdOn
      updatedOn
    }
  }
`;

const GET_POST = gql`
  query GetPost($identifier: String!) {
    post(identifier: $identifier) {
      id
      identifier
      title
      body
      summary
      visible
      createdOn
      updatedOn
    }
  }
`;

describe('Post schema posts', () => {
  let connection: Connection;
  let backup: IBackup;
  let server: ApolloServer;

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

    server = new ApolloServer({
      typeDefs,
      resolvers,
      dataSources: () => ({
        postAPI: new PostAPI()
      })
    });
  });

  afterAll(async () => {
    await connection.close();
  })

  afterEach(() => {
    backup.restore();
  })

  it('returns blank array when there are no posts', async () => {
    const result = await server.executeOperation({
      query: GET_POSTS
    });
    
    expect(result.errors).toBeUndefined();
    expect(result.data?.posts?.length).toBe(0);
  });

  it('returns array of posts when posts found', async () => {
    await getRepository(Post).save([POST1, POST2]);

    const result = await server.executeOperation({
      query: GET_POSTS
    });
    
    expect(result.errors).toBeUndefined();
    expect(result.data?.posts?.length).toBe(2);
  });
})

describe('Post schema post(identifier)', () => {
  let connection: Connection;
  let backup: IBackup;
  let server: ApolloServer;

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

    server = new ApolloServer({
      typeDefs,
      resolvers,
      dataSources: () => ({
        postAPI: new PostAPI()
      })
    });
  });

  afterAll(async () => {
    await connection.close();
  })

  afterEach(() => {
    backup.restore();
  })

  it('returns undefined when no post found', async () => {
    const result = await server.executeOperation({
      query: GET_POST,
      variables: {
        identifier: POST1.identifier
      }
    });
    
    expect(result.errors).toBeUndefined();
    expect(result.data?.post).toBeNull();
  })

  it('returns post found', async () => {
    await getRepository(Post).save([POST1, POST2]);

    const result = await server.executeOperation({
      query: GET_POST,
      variables: {
        identifier: POST1.identifier
      }
    });
    
    expect(result.errors).toBeUndefined();
    expect(result.data?.post?.identifier).toBe(POST1.identifier);
    expect(result.data?.post?.title).toBe(POST1.title);
    expect(result.data?.post?.summary).toBe(POST1.summary);
    expect(result.data?.post?.body).toBe(POST1.body);
    expect(result.data?.post?.createdOn).toBe((moment(POST1.createdOn).unix() * 1000).toString());
    expect(result.data?.post?.updatedOn).toBe((moment(POST1.updatedOn).unix() * 1000).toString());
  })
})
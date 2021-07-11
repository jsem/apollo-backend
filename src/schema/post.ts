import { gql } from 'apollo-server';

// Post: a post on the website
export const typeDefs = gql`
  type Query {
    post(id: Int!): Post
    posts: [Post]!
  }

  type Post {
    id: Int!
    identifier: String!
    title: String!
    body: String!
    summary: String!
    visible: Boolean!
    createdOn: String!
    updatedOn: String
  }
`;

export const resolvers = {
  Query: {
    post: async (_: any, { id }: { id: number }, { dataSources }: { dataSources: any }) => {
      return await dataSources.postAPI.getPost(id);
    },
    posts: async (_: any, __: any, { dataSources }: { dataSources: any }) => {
      return await dataSources.postAPI.getPosts();
    },
  }
};
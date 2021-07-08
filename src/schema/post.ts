import { gql } from 'apollo-server';

// Post: a post on the website
export const typeDefs = gql`
  type Query {
    post(id: Int!): Post
    posts: Post
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
    post: (id: bigint) => {
      // get post
      
    },
    posts: () => {
      // get all posts
      return {

      }
    },
  }
};
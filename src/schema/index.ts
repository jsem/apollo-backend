import _ from 'lodash';
import { typeDefs as Post, resolvers as PostResolvers } from './post';

export const typeDefs = [
  Post
];

export const resolvers = _.merge(
  PostResolvers
);
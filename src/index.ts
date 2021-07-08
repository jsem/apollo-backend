import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './schema';

// define server
const server = new ApolloServer({ typeDefs, resolvers });

// start server
server.listen();
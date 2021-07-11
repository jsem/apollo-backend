import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import { typeDefs, resolvers } from './schema';
import PostAPI from './datasources/post';
import { ormConfig } from './config/db';
import "reflect-metadata";

//load .env config
dotenv.config();

//start apollo server and connect to database
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      postAPI: new PostAPI()
    })
  });

  await createConnection(ormConfig());

  server.listen();
}

startServer();
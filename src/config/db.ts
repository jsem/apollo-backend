import { ConnectionOptions } from 'typeorm';
import Post from '../entity/Post';

/**
 * Calculates the orm config
 * @returns the orm connection config
 */
export function ormConfig(): ConnectionOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
      Post
    ]
  }
}
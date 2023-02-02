import { ApolloServer } from '@apollo/server'
import mongoose from 'mongoose'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@apollo/server/express4';
import { loadFiles } from '@graphql-tools/load-files'
import express from 'express'
import http from 'http'
import bodyParser from 'body-parser';
import { getResolvers } from './graphql/resolvers';
import { makeCommentRepository, makePostRepository } from './repositories'
import { CommentDao, PostDao } from './mongo';
import { ApplicationContext } from './graphql/resolvers/types';

async function listen(port: number) {
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer<ApplicationContext>({
    typeDefs: await loadFiles('src/graphql/schema.graphql'),
    resolvers: getResolvers(),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()  

  app.use('/graphql', bodyParser.json(), expressMiddleware(server, {
    context: async () => {
      return  {
        dataSources: {
          postRepository: makePostRepository(PostDao), 
          commentRepository: makeCommentRepository(CommentDao)}
        }
    }}));

  return new Promise((resolve, reject) => {
    httpServer.listen(port).once('listening', resolve).once('error', reject)
  })
}

async function main() {
  try {
    await mongoose.connect('mongodb://mongodb:27017/blog')
    mongoose.set('strictQuery', false)
    await listen(4000)
    console.log('🚀 Server is ready at http://localhost:4000/graphql')
  } catch (err) {
    console.error('💀 Error starting the node server', err)
  }
}

void main()
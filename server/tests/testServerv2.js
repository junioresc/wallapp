const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require ('../utils/auth');
const makeTestApp = require('./testApp');
const testdb = require("./testdb");

const { typeDefs, resolvers } = require('../schemas');

// This function will create a new server Apollo Server instance
const createApolloServer = async (options = { port: 3001 }) => {
  const app = await makeTestApp(testdb);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });
          
  await server.start();
  console.log(app)
  console.log(server)

  server.applyMiddleware({ app });

  // serverInfo is an object containing the server instance and the url the server is listening on
  return server;
};

module.exports = createApolloServer;
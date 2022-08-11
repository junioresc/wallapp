const makeTestApp = require("./testApp");
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require ('../utils/auth');
const testdb = require("./testdb");
const express = require('express')

const { typeDefs, resolvers } = require('../schemas');

// This function will create a new server Apollo Server instance
const createApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  return server;
};

module.exports = createApolloServer;
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const path = require('path');
const http = require('http');
const dotenv = require("dotenv");
dotenv.config();

const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;

(async function () {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        cache: 'bounded',
        context: authMiddleware
    });
    
    await server.start();
    
    server.applyMiddleware({ app, path: '/https://wall-app-social.herokuapp.com/' });
    
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    
    if(process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
    }
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
})();
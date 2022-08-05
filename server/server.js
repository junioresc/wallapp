const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const path = require('path');
const { User } = require('./models');
const jwt = require('jsonwebtoken');

const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/confirmation/:token', async (req, res) => {
    try {
        const { data: {_id} } = jwt.verify(req.params.token, emailSecret);
        await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { thoughts: thought._id } },
            { new: true }
        );

        return User;
    } catch (e) {
        res.send('error');
    }

    res.redirect(window.location.origin);
})

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
});
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Post {
        _id: ID!
        postText: String
        createdAt: String
        username: String
        commentCount: Int
        comments: [Comment]
    }
    type Comment {
        _id: ID!
        commentBody: String
        createdAt: String
        username: String
    }
    type User {
        _id: ID!
        username: String
        email: String
        confirmed: Boolean
        friendCount: Int
        posts: [Post]
        friends: [User]
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
        users: [User]
        user(username: String!): User
        posts(username: String, offset: Int, limit: Int): [Post]
        post(_id: ID!): Post
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addPost(postText: String!): Post
        addComment(postId: ID!, commentBody: String!): Post
        addFriend(friendId: ID!): User
        removeFriend(friendId: ID!): User
        confirmation(username: String!, email: String!, _id: String!): User
    }
`;

module.exports = typeDefs;
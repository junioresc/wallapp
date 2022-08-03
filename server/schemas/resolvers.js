const { User, Post } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const jwt = require('jsonwebtoken');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('--v -password')
                    .populate('friends')
                    .populate('posts');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        posts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Post.find(params).sort({ createdAt: -1 });
        },
        post: async (parent, { _id }) => {
            return Post.findOne({ _id });
        },
        users: async () => {
            return User.find()
                .select('--v -password')
                .populate('friends')
                .populate('posts');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('--v -password')
                .populate('friends')
                .populate('posts');
        }
    },
    Mutation: {
        addUser: async (parent, args, { transporter, EMAIL_SECRET }) => {
            const user = await User.create(args);
            const token = signToken(user);
        }
    }
};

module.exports = resolvers;
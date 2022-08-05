const { User, Post } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { sendMail } = require('../utils/sendEmail');

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
        addUser: async (parent, args) => {
            const user = await User.create(args);
            
            // async email confirmation, will create confirmation url and send to user in transporter
            sendMail(args);
            return user;
        },
        login: async (parent, args) => {
            const user = await User.findOne({ email });

            if(!User) {
                throw new AuthenticationError('Incorrect Credentials');
            }

            if (!user.confirmed) {
                throw new AuthenticationError('Please confirm your email to login');
            }

            const correctPW = await user.isCorrectPassword(password);

            if(!correctPW) {
                throw new AuthenticationError('Incorrect Credentials')
            }
            const token = signToken(user);
            return { token, user };
        },
        addPost: async (parents, args, context) => {
            if(context.user) {
                const post = await Post.create({ ...args, username: context.user.username });
                
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { posts: post._id } },
                    { new: true }
                );

                return post;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addComment: async (parent, { postId, commentBody }, context) => {
            if(context.user) {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $push: { comments: { commentBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return updatedPost;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addFriend: async (parent, { friendId }, context) => {
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendId } },
                    { new: true }
                ).populate('friends');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;
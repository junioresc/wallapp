const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');
const commentSchema = require('./Comment');

const postSchema = new Schema(
    {
        postText: {
            type: String,
            required: 'You need to add text to create a post!',
            minLength: 1,
            maxLength: 1000
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dayjs(timestamp).format('MMM Do, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true
        },
        comments: [commentSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

postSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

const Post = model('Post', postSchema);

module.exports = Post;
const { Schema } = require('mongoose');
const dayjs = require('dayjs');
let advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

const commentSchema = new Schema(
    {
        commentBody: {
            type: String,
            required: true,
            maxlength: 1000
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dayjs(timestamp).format('MMM Do, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = commentSchema;
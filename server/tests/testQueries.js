const { gql } = require('apollo-server-express');

const QUERY_POSTS = gql`
    query posts($username: String) {
        posts(username: $username) {
            _id
            postText
            createdAt
            username
            commentCount
            comments {
                _id
                createdAt
                username
                commentBody
            }
        }
    }
`;

const QUERY_POST = gql`
    query post($id: ID!) {
        post(_id: $id) {
            _id
            postText
            createdAt
            username
            commentCount
            comments {
                _id
                createdAt
                username
                commentBody
            }
        }
    }
`;

const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            friendCount
            friends {
                _id
                username
            }
            posts {
                _id
                postText
                username
                createdAt
                commentCount
            }
        }
    }
`;

const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            confirmed
            friendCount
            friends {
                _id
                username
            }
            posts {
                _id
                postText
                createdAt
                commentCount
                comments {
                    _id
                    username
                    createdAt
                    commentBody
                }
            }
        }
    }
`;

const QUERY_ME_BASIC = gql`
    {
        me {
            _id
            username
            email
            confirmed
            friendCount
            friends {
                _id
                username
            }
        }
    }
`;

module.exports = QUERY_POSTS, QUERY_POST, QUERY_USER, QUERY_ME, QUERY_ME_BASIC
import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
				confirmed
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			user {
				_id
				username
				email
				confirmed
			}
		}
	}
`;

export const ADD_FRIEND = gql`
	mutation addFriend($id: ID!) {
		addFriend(friendId: $id) {
			_id
			username
			friendCount
			friends {
				_id
				username
			}
		}
	}
`;

export const REMOVE_FRIEND = gql`
	mutation removeFriend($id: ID!) {
		removeFriend(friendId: $id) {
			_id
			username
			friendCount
			friends {
				_id
				username
			}
		}
	}
`;

export const ADD_POST = gql`
	mutation addPost($postText: String!) {
		addPost(postText: $postText) {
			_id
			postText
			createdAt
			username
			commentCount
			comments {
				_id
			}
		}
	}
`;

export const REMOVE_POST = gql`
	mutation removePost($postText: String!) {
		removePost(postText: $postText) {
			_id
			postText
			createdAt
			username
			commentCount
			comments {
				_id
			}
		}
	}
`;

export const ADD_COMMENT = gql`
	mutation addComment($commentId: ID!, $commentBody: String!) {
		addComment(commentId: $commentId, commentBody: $commentBody) {
			_id
			commentCount
			comments {
				_id
				commentBody
				createdAt
				username
			}
		}
	}
`;

export const REMOVE_COMMENT = gql`
	mutation removeComment($commentId: ID!, $commentBody: String!) {
		removeComment(commentId: $commentId, commentBody: $commentBody) {
			_id
			commentCount
			comments {
				_id
				commentBody
				createdAt
				username
			}
		}
	}
`;

export const CONFIRM_EMAIL = gql`
	mutation confirmation($username: String!, $email: String!, $_id: String!) {
		confirmation(username: $username, email: $email, _id: $_id) {
			_id
			username
			email
			confirmed
		}
	}
`;

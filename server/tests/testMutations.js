export const LOGIN_USER = `
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

export const ADD_USER = `
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

export const ADD_FRIEND = `
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

export const REMOVE_FRIEND = `
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

export const ADD_POST = `
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

export const REMOVE_POST = `
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

export const ADD_COMMENT = `
	mutation addComment($postId: ID!, $commentBody: String!) {
		addComment(postId: $postId, commentBody: $commentBody) {
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

export const REMOVE_COMMENT = `
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

export const CONFIRM_EMAIL = `
	mutation confirmation($username: String!, $email: String!, $_id: String!) {
		confirmation(username: $username, email: $email, _id: $_id) {
			_id
			username
			email
			confirmed
		}
	}
`;
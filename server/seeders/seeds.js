const db = require("../config/connection");
const { Post, User } = require("../models");
const users = require("./users");
const posts = require("./posts");
const comments = require("./comments");

db.once("open", async () => {
	await Post.deleteMany({});
	await User.deleteMany({});

	let userData = [];

	for (let i = 0; i < 100; i += 1) {
		const username = users[i].username;
		const email = users[i].email;
		const password = users[i].password;
		const confirmed = users[i].confirmed;
	
		userData.push({ username, email, password, confirmed });
	}

	const createdUsers = await User.insertMany(userData);

	// create friends
	for (let i = 0; i < 100; i += 1) {
		const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
		const { _id: userId } = createdUsers[randomUserIndex];

		let friendId = userId;

		while (friendId === userId) {
			const randomUserIndex = Math.floor(
				Math.random() * createdUsers.length
			);
			friendId = createdUsers[randomUserIndex];
		}

		await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
	}

	// add posts
	let createdPosts = [];
	for (let i = 0; i < 100; i += 1) {
		const postText = posts[i];

		const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
		const { username, _id: userId } = createdUsers[randomUserIndex];

		const createdPost = await Post.create({ postText, username });

		const updatedUser = await User.updateOne(
			{ _id: userId },
			{ $push: { posts: createdPost._id } }
		);

		createdPosts.push(createdPost);
	}

	// add comments
	for (let i = 0; i < 100; i += 1) {
		const commentBody = comments[i];

		const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
		const { username } = createdUsers[randomUserIndex];

		const randomPostIndex = Math.floor(Math.random() * createdPosts.length);
		const { _id: postId } = createdPosts[randomPostIndex];

		await Post.updateOne(
			{ _id: postId },
			{ $push: { comments: { commentBody, username } } },
			{ runValidators: true }
		);
	}

	console.log("all done!");
	process.exit(0);
});

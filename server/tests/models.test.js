const mongoose = require("mongoose");
const { User, Post } = require("../models");
const db = require("./testdb");

const userData = {
	username: "TekTonic",
	email: "tektonic@gmail.com",
	password: "TekLoon123",
};

const postText =
	"Hopes and dreams were dashed that day. It should have been expected, but it still came as a shock. The warning signs had been ignored in favor of the possibility, however remote, that it could actually happen. That possibility had grown from hope to an undeniable belief it must be destiny. That was until it wasn't and the hopes and dreams came crashing down.";

const commentBody = "I really like your creativity!";

beforeAll(async () => {
	await db.setUp();
});

afterEach(async () => {
	await db.dropCollections();
});

afterAll(async () => {
	await db.dropDatabase();
});

/**
 * User model
 */
describe("verifies mongoose User model works correctly", () => {
	it("create & save User successfully", async () => {
		const savedUser = await User.create(userData);
		// Object Id should be defined when successfully saved to MongoDB.
		expect(savedUser._id).toBeDefined();
		expect(savedUser.email).toBe(userData.email);
		expect(savedUser.username).toBe(userData.username);
		expect(savedUser.password).toBeDefined();
		expect(savedUser.password).not.toEqual(userData.password);
	});

	it("checks if data is structured the way defined", async () => {
		const savedUser = await User.create(userData);
		expect(savedUser).toMatchObject({
			username: "TekTonic",
			email: "tektonic@gmail.com",
			password: expect.any(String),
			confirmed: false,
			posts: [],
			friends: [],
			_id: expect.any(Object),
			__v: 0,
		});
	});

	// You shouldn't be able to add in any field that isn't defined in the schema
	it("insert User successfully, but the field not defined in schema should be undefined", async () => {
		const savedUserWithInvalidField = await User.create({
			...userData,
			nickname: "Handsome Tektonic spray",
		});
		expect(savedUserWithInvalidField._id).toBeDefined();
		expect(savedUserWithInvalidField.nickname).toBeUndefined();
	});

	// It should us tell us the errors in on email field.
	it("create user without required field should failed", async () => {
		let err;
		try {
			await User.create({ name: "TekLoon" });
		} catch (error) {
			err = error;
		}
		expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
		expect(err.errors.email).toBeDefined();
		expect(err.errors.password).toBeDefined();
	});

	it("should update the confirmed email field to true", async () => {
		const savedUser = await User.create({
			username: "testaccount",
			email: "testaccount@gmail.com",
			password: "testing1",
		});
		const updatedUser = await User.findOneAndUpdate(
			{ _id: savedUser._id },
			{ $set: { confirmed: true } },
			{ new: true }
		);
		expect(savedUser._id).toBeDefined();
		expect(savedUser.email).toBe("testaccount@gmail.com");
		expect(savedUser.password).toBeDefined();
		expect(savedUser.confirmed).toBeFalsy();
		expect(updatedUser.confirmed).toBeTruthy();
	});

	// User.findById is necessary because if findoneandupdate is used then it skips the .pre('save') method and will not rehash new password
	it("should update the password field to the new password and return encrypted", async () => {
	    const savedUser = await User.create({ username: "testaccount", email: 'testaccount@gmail.com', password: 'testing1' });
	    
	    const updatedUser = await User.findById(
	      { _id: savedUser._id }
	    );
		updatedUser.password = 'testingnewpassword'
	    const hashedUser = await updatedUser.save();
	    expect(hashedUser._id).toBeDefined();
	    expect(hashedUser._id).toBe(updatedUser._id);
	    expect(hashedUser.email).toBe('testaccount@gmail.com');
	    expect(hashedUser.password).toBeDefined();
	    expect(hashedUser.password).not.toEqual(savedUser.password);
	    expect(hashedUser.confirmed).toBeFalsy();
	});
});

/**
 * Post model
 */
describe("verifies mongoose Post model works correctly", () => {
	it("creates & saves Post successfully", async () => {
		const savedUser = await User.create(userData);
		const createdPost = await Post.create({
			postText,
			username: savedUser.username,
		});
		expect(createdPost._id).toBeDefined();
		expect(createdPost.username).toBe(userData.username);
		expect(createdPost.createdAt).toBeDefined();
		expect(createdPost.comments).toEqual([]);
	});

	// You shouldn't be able to add in any field that isn't defined in the schema
	it("insert Post successfully, but the field not defined in schema should be undefined", async () => {
		const savedUser = await User.create(userData);
		const savedPostWithExtraField = await Post.create({
			postText,
			username: savedUser.username,
			title: "Life's biggest question",
		});
		expect(savedPostWithExtraField._id).toBeDefined();
		expect(savedPostWithExtraField.username).toBe(userData.username);
		expect(savedPostWithExtraField.createdAt).toBeDefined();
		expect(savedPostWithExtraField.comments).toEqual([]);
		expect(savedPostWithExtraField.title).toBeUndefined();
	});

	// // It should us tell us the errors in on email field.
	it("create Post without required field should fail", async () => {
		let err;
		try {
			const savedUser = await User.create(userData);
			await Post.create({ username: savedUser.username });
		} catch (error) {
			err = error;
		}
		expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
		expect(err.errors.postText).toBeDefined();
	});

	it("should update the postText field to new text", async () => {
		const savedUser = await User.create({
			username: "testaccount",
			email: "testaccount@gmail.com",
			password: "testing1",
		});
		const savedPost = await Post.create({
			postText,
			username: savedUser.username,
		});
		const updatedPost = await Post.findOneAndUpdate(
			{ _id: savedPost._id },
			{
				$set: {
					postText:
						"It's an unfortunate reality that we don't teach people how to make money (beyond getting a 9 to 5 job) as part of our education system. The truth is there are a lot of different, legitimate ways to make money. That doesn't mean they are easy and that you won't have to work hard to succeed, but it does mean that if you're willing to open your mind a bit you don't have to be stuck in an office from 9 to 5 for the next fifty years o your life.",
				},
			},
			{ new: true }
		);
		expect(updatedPost._id).toBeDefined();
		expect(updatedPost._id).toEqual(savedPost._id);
		expect(updatedPost.username).toBe(savedUser.username);
		expect(updatedPost.postText).not.toEqual(savedPost.postText);
		expect(updatedPost.createdAt).toBeDefined();
		expect(updatedPost.comments).toEqual([]);
	});
});

/**
 * Comment model
 */
describe("verifies mongoose Comment model works correctly", () => {
	it("creates & saves a comment successfully", async () => {
		const savedUser = await User.create(userData);
		const createdPost = await Post.create({
			postText,
			username: savedUser.username,
		});
		const updatedPost = await Post.findOneAndUpdate(
			{ _id: createdPost._id },
			{
				$push: {
					// normally context = context.user.username
					comments: { commentBody, username: createdPost.username },
				},
			},
			{ new: true, runValidators: true }
		);
		expect(updatedPost._id).toBeDefined();
		expect(updatedPost.username).toBe(userData.username);
		expect(updatedPost.createdAt).toBeDefined();
		expect(updatedPost.comments[0].commentBody).toBe(commentBody);
		expect(updatedPost.commentCount).toEqual(1);
	});

	// You shouldn't be able to add in any field that isn't defined in the schema
	it("insert Comment successfully, but the field not defined in schema should be undefined", async () => {
	  const savedUser = await User.create(userData);
	  const createdPost = await Post.create({ postText, username: savedUser.username });
    const updatedPostWithExtraField = await Post.findOneAndUpdate(
			{ _id: createdPost._id },
			{
				$push: {
					// normally context = context.user.username
					comments: { commentBody, username: createdPost.username, title: 'Life\'s biggest question' },
				},
			},
			{ new: true, runValidators: true }
		);
	  expect(updatedPostWithExtraField._id).toBeDefined();
	  expect(updatedPostWithExtraField.username).toBe(userData.username);
	  expect(updatedPostWithExtraField.createdAt).toBeDefined();
	  expect(updatedPostWithExtraField.comments[0].commentBody).toBe(commentBody);
    expect(updatedPostWithExtraField.commentCount).toEqual(1);
	  expect(updatedPostWithExtraField.comments[0].title).toBeUndefined();
	});

	// It should us tell us the errors in on commentBody field.
	it("create Comment without required field should fail", async () => {
	  let err;
	  try {
	    const savedUser = await User.create(userData);
	    const createdPost = await Post.create({ postText, username: savedUser.username });
      await Post.findOneAndUpdate(
        { _id: createdPost._id },
        {
          $push: {
            // normally context = context.user.username
            comments: { username: createdPost.username },
          },
        },
        { new: true, runValidators: true }
      );
	  } catch (error) {
	    err = error;
	  }
	  expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
	  expect(err.errors).toBeDefined();
	});

	// it("should update the commentBody field to new text", async () => {
	//   const savedUser = await User.create({ username: "testaccount", email: 'testaccount@gmail.com', password: 'testing1' });
	//   const savedPost = await Post.create({ postText, username: savedUser.username });
	//   const updatedPostWithComment = await Post.findOneAndUpdate(
  //     { _id: savedPost._id },
  //     {
  //       $push: {
  //         // normally context = context.user.username
  //         comments: { commentBody, username: savedPost.username },
  //       },
  //     },
  //     { new: true, runValidators: true }
  //   );
  //   console.log(savedUser)
  //   console.log(updatedPostWithComment.comments)
  //   console.log(updatedPostWithComment.comments[0])
  //   const updatedComment = await commentSchema.findOneAndUpdate(
	//     { _id: updatedPostWithComment.comments[0]._id },
	//     { $set: { commentBody: "You are so clever!", username: updatedPostWithComment.username } },
	//     { new: true }
	//   )
	//   expect(updatedComment._id).toBeDefined();
	//   expect(updatedComment._id).toEqual(savedPost._id);
	//   expect(updatedComment.username).toBe(savedUser.username);
	//   expect(updatedComment.comments[0].commentBody).not.toEqual(updatedPostWithComment.comments[0].commentBody);
	//   expect(updatedComment.createdAt).toBeDefined();
	//   expect(updatedComment.commentCount).toEqual(1);
	// });
});

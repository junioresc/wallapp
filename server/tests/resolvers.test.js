const { ApolloServer, UserInputError, gql } = require('apollo-server-express');
const { GraphQLError } = require('graphql')
const { typeDefs, resolvers } = require('../schemas');
const db = require('./testdb');

let server;

beforeAll(async () => {
	server = new ApolloServer({
		typeDefs,
		resolvers
	});
});

afterEach(async () => {
	
});

afterAll(async () => {
	
});


describe("checking requesting the necessary user data from graphql and expected output", () => {
	
	it("returns a single queried user with all its available data", async () => {
	
		const result = await server.executeOperation({
			query: `query user($username: String!) {
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
						createdAt
						commentCount
					}
				}
			}`,
			variables: { username: 'kminchelle' },
		});

		console.error(result.errors)
		expect.assertions(7)
		expect(result.errors).toBeUndefined();
		expect(result.data?.user._id).toEqual(expect.any(String))
		expect(result.data?.user.username).toBe("kminchelle");
		expect(result.data?.user.email).toBe("kminchelle@qq.com");
		expect(result.data?.user.friendCount).toEqual(expect.any(Number));
		expect(result.data?.user.friends).toEqual(expect.any(Array));
		expect(result.data?.user.posts).toEqual(expect.any(Array));
	});

	it("returns a single queried user but should fail because there is no username variable ex. if none is in resolver args", async () => {
		const result = await server.executeOperation({
			query: `query user($username: String!) {
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
						createdAt
						commentCount
					}
				}
			}`
		});

		expect(result.errors).toBeDefined();
		expect(result.errors[0]).toBeInstanceOf(UserInputError);
		expect(result.errors[0].message).toBe('Variable "$username" of required type "String!" was not provided.')
	});
});

describe('testing out quering the logged in user and checking if authentication works', () => {

	it("requests data of user with logged in credentials in context", async () => {
		// Context is injected because there is no server request with a body. If testing please open up mongo in the terminal and
		// search up kminchelle's object _id with username. db.users.find({ username: 'kminchelle' })
		// when you seed the server, that users object id changes and resolver searches record using object id from jwt token
		const contextServer = new ApolloServer({
			typeDefs,
			resolvers,
			context: () => ({ user: { _id: '62f5bb7f07df66b2eb92c062', username: "kminchelle", email: 'kminchelle@qq.com' } }),
		});
		const result = await contextServer.executeOperation({
			query: `{
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
				}`,
		});

		expect(result.errors).toBeUndefined();
		expect(result.data?.me._id).toEqual(expect.any(String))
		expect(result.data?.me.username).toBe("kminchelle");
		expect(result.data?.me.email).toBe("kminchelle@qq.com");
		expect(result.data?.me.friendCount).toEqual(expect.any(Number));
		expect(result.data?.me.friends).toEqual(expect.any(Array));
		expect(result.data?.me.posts).toEqual(expect.any(Array));
	});

	it("requests data of user that is supposed to be logged in but should fail user is not logged in", async () => {

		const result = await server.executeOperation({
			query: `{
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
				}`
		});

		expect(result.errors).toBeDefined();
		expect(result.errors[0]).toBeInstanceOf(GraphQLError);
		expect(result.errors[0].message).toBe('Not logged in')
	});
});

describe('testing out quering the posts and checking expected output', () => {

	it("requests data from user that is supposed to be logged in but should fail because no credentials", async () => {
		const result = await server.executeOperation({
			query: `query posts($username: String) {
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
			}`,
			variables: { username: 'kminchelle' },
		});
		
		expect(result.data?.posts._id).toEqual(expect.any(String))
		expect(result.data?.posts.username).toBe("kminchelle");
		expect(result.data?.posts.email).toBe("kminchelle@qq.com");
		expect(result.data?.posts.friendCount).toEqual(expect.any(Number));
		expect(result.data?.posts.friends).toEqual(expect.any(Array));
		expect(result.data?.posts.posts).toEqual(expect.any(Array));
	});
});
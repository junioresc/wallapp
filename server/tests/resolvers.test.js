const express = require("express");
const { typeDefs, resolvers } = require("../schemas");
const database = require("../config/connection");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("../utils/auth");
const mongoose = require("mongoose");

describe("checking requesting the necessary user data from graphql and expected output", () => {
	it("returns a single queried user with all its available data", async () => {
		const server = new ApolloServer({
			typeDefs,
			resolvers,
		});
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
			variables: { username: "junioresc" },
		});

		expect(result.errors).toBeUndefined();
		console.log(result.data);
		expect(result.data?.user.username).toBe("junioresc");
		expect(result.data?.user.email).toBe("junioresc1092@gmail.com");
		expect(result.data?.user.friendCount).toBe(0);
		expect(result.data?.user.friends).toEqual([]);
		expect(result.data?.user.posts).toEqual([]);
	});

	it("returns a single queried user with all its available data", async () => {
		const server = new ApolloServer({
			typeDefs,
			resolvers,
		});
		const result = await server.executeOperation({
			query: 
                `{
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

		expect(result.errors).toBeUndefined();
		console.log(result.data);
		expect(result.data?.user.username).toBe("junioresc");
		expect(result.data?.user.email).toBe("junioresc1092@gmail.com");
		expect(result.data?.user.friendCount).toBe(0);
		expect(result.data?.user.friends).toEqual([]);
		expect(result.data?.user.posts).toEqual([]);
	});
});

// describe('persons resolver', () => {

//     test('name should be the username', async () => {
//       const users = await resolvers.Query.players()
//       expect(users[1].username).toBe('testaccount')
//     })

//     test('email should be specific', async () => {
//       const users = await resolvers.Query.players()
//       expect(users[0].email).toBe('helloworld@gmail.com')
//     })
//   })

//   describe('team resolvers', () => {

//     test('team should be an object', async () => {
//       const dodgers = await resolvers.Query.team(teamFixture, { id: 119 })
//       expect(dodgers).toStrictEqual(teamFixture)
//       expect(dodgers.id).toBe(119)
//     })
//   })

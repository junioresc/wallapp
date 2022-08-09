import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS, QUERY_ME_BASIC } from "../utils/queries";
import PostList from "../components/PostList";
import Auth from "../utils/auth";
import FriendList from "../components/FriendList";
import PostForm from "../components/PostForm";

const Home = () => {
	const { loading, data } = useQuery(QUERY_POSTS);

	const { data: userData } = useQuery(QUERY_ME_BASIC);

	const posts = data?.posts || [];

	const loggedIn = Auth.loggedIn();

	return (
		<main className="container-fluid">
			<div>
				{loggedIn && (
					<div>
						<PostForm />
					</div>
				)}
				<div>
					{loading ? (
						<div className="d-flex flex-column align-items-center">
							<h3 className="text-center pt-5">Loading posts.....</h3>
							<Spinner animation="border" role="status" className="mt-5">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						</div>
					) : (
						<PostList
							posts={posts}
							title="Here is what other people are thinking at this moment:"
						/>
					)}
				</div>
				{loggedIn && userData ? (
                    <FriendList
                        username={userData.me.username}
                        friendCount={userData.me.friendCount}
                        friends={userData.me.friends}
                    />
				) : null}
			</div>
		</main>
	);
};

export default Home;

import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS, QUERY_ME_BASIC } from "../utils/queries";
import Post from "../components/Post";
import Container from "react-bootstrap/Container";
import Auth from "../utils/auth";
import FriendList from "../components/FriendList";
import PostForm from "../components/PostForm";
import { InView } from "react-intersection-observer";
import { motion } from 'framer-motion';

const Home = () => {
	const { loading, data, fetchMore } = useQuery(QUERY_POSTS, {
		variables: {
			offset: 0,
			limit: 5
		}
	});

	const { data: userData } = useQuery(QUERY_ME_BASIC);

	const posts = data?.posts || [];

	const loggedIn = Auth.loggedIn();

	return (
		<motion.main
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exit={{opacity: 0}}
		>
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
					
					<Container>
						<h3 className="mx-2 mt-3">Here is what other people are thinking at this moment:</h3>
						{posts &&
							posts.map(post => (
							<Post
								onLoadMore={() => fetchMore({
									variables: {
										offset: posts.length
									}})}
								post={post}
								key={post._id}
							/>
							))}
						{posts && (
							<InView
							onChange={async (inView) => {
								const currentLength = posts.length || 0;
								if (inView) {
								await fetchMore({
									variables: {
									offset: currentLength,
									limit: currentLength * 2,
									},
								});
								}
							}}
							/>
						)}
					</Container>
				)}
			</div>
			{loggedIn && userData ? (
				<FriendList
					username={userData.me.username}
					friendCount={userData.me.friendCount}
					friends={userData.me.friends}
				/>
			) : null}
		</motion.main>
	);
};

export default Home;

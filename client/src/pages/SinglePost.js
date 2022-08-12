import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_POST } from "../utils/queries";
import CommentList from "../components/CommentList";
import Auth from "../utils/auth";
import CommentForm from "../components/CommentForm";
import { motion } from 'framer-motion';

const SinglePost = (props) => {
	const { id: postId } = useParams();

	const { loading, data } = useQuery(QUERY_POST, {
		variables: { id: postId },
	});

	const post = data?.post || {};

	if (loading) {
		return (
			<div className="d-flex flex-column align-items-center">
				<h3 className="text-center pt-5">Loading post.....</h3>
				<Spinner animation="border" role="status" className="mt-5">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</div>
		);
	}

	if(post === {}) {
		return (
			<h2 className='text-center pt-5'>
            	Oops, looks like that post doesn't exist!
        	</h2>
		)
	}

	return (
		<>
			<Card className="mx-4 mb-2">
				<Card.Body>
					<Card.Title>
						<Link to={`/profile/${post.username}`} style={{ fontWeight: 700 }}>
							{post.username}
						</Link>{" "}
						posted on {post.createdAt}
					</Card.Title>
					{post.postText}
				</Card.Body>
			</Card>

			{post.commentCount > 0 && <CommentList comments={post.comments} />}
			{Auth.loggedIn() && <CommentForm postId={post._id} />}
		</>
	);
};

export default SinglePost;

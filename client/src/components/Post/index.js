import React, { useRef } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const Post = ({ post }) => {

	const postRef = useRef();


	if (!post) {
		return <h3 className="text-center m-5">No Posts Yet</h3>;
	}

	return(
		<Card className="mx-2 my-4" ref={postRef}>
			<Card.Body>
				<Card.Title>
					<Link
						to={`/profile/${post.username}`}
						style={{ fontWeight: 700 }}
					>
						{post.username}
					</Link>{" "}
					posted on {post.createdAt}
				</Card.Title>
				<Link to={`/post/${post._id}`}>
					<p>{post.postText}</p>
					<p>
						Comments: {post.commentCount} || Click to{" "}
						{post.commentCount ? "see" : "start"} the discussion!
					</p>
				</Link>
			</Card.Body>
		</Card>
	)
};

export default Post;

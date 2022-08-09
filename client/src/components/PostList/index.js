import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const PostList = ({ posts, title }) => {
	if (!posts.length) {
		return <h3 className="text-center m-5">No Posts Yet</h3>;
	}

	return (
		<Container>
			<h3 className="mx-2 mt-3">{title}</h3>
			{posts &&
				posts.map((post) => (
					<Card key={post._id} className="mx-2 my-4">
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
								<p>{post.postText}</p>
							<Link to={`/post/${post._id}`}>
								<p>
									Comments: {post.commentCount} || Click to{" "}
									{post.commentCount ? "see" : "start"} the discussion!
								</p>
							</Link>
						</Card.Body>
					</Card>
				))}
		</Container>
	);
};

export default PostList;

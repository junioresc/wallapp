import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const CommentList = ({ comments }) => {
	return (
		<>
			<h3>Comments</h3>
			{comments &&
				comments.map((comment) => (
					<Card key={comment._id}>
						<Card.Body>
							{comment.commentBody} {"// "}
							<Link to={`/profile/${comment.username}`}>
								{comment.username} on {comment.createdAt}
							</Link>
						</Card.Body>
					</Card>
				))}
		</>
	);
};

export default CommentList;

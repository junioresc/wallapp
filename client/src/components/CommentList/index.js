import React from 'react';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';

const CommentList = ({ comments }) => {
    return(
        <Card>
            <Card.Header>Comments</Card.Header>
            <Card.Body>
                {comments &&
                comments.map(comment => (
                    <p key={comment._id}>
                        {comment.commentBody} {'// '}
                        <Link to={`/profile/${comment.username}`}>
                            {comment.username} on comment.createdAt
                        </Link>
                    </p>
                ))}
            </Card.Body>
        </Card>
    );
};

export default CommentList;
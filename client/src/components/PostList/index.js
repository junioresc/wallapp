import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const PostList = ({ posts, title }) => {
    if(!posts.length) {
        return <h3>No Posts Yet</h3>;
    }

    return(
        <>
            <h3>{title}</h3>
            {posts &&
            posts.map(post => (
                <Card key={post._id}>
                    <Card.Header>
                        <Link to={`/profile/${post.username}`}
                        style={{ fontWeight: 700 }}>
                            {post.username}
                        </Link>{' '}
                        posted on {post.createdAt}
                    </Card.Header>
                    <Card.Body>
                        <Link to={`/post/${post._id}`}>
                            <p>{post.postText}</p>
                            <p>
                                Comments: {post.commentCount} || Click to {' '}
                                {post.commentCount ? 'see' : 'start'} the discussion!
                            </p>
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
};

export default PostList;
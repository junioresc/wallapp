import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const PostList = ({ posts, title }) => {
    if(!posts.length) {
        return <h3>No Posts Yet</h3>;
    }

    return(
        <Container>
            <h3>{title}</h3>
            {posts &&
            posts.map(post => (
                <Card key={post._id} className='m-4'>
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
        </Container>
    );
};

export default PostList;
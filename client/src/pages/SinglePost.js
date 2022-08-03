import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';
import CommentList from '../components/CommentList';
import Auth from '../utils/auth';
import CommentForm from '../components/CommentForm';

const SinglePost = props => {
    const { id: postId } = useParams();

    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: postId }
    });

    const post = data?.post || {};

    if(loading) {
        return(
            <Spinner animation='border' role='status'>
                <span>Loading...</span>
            </Spinner>
        )
    }

    return(
        <>
            <Card>
                <Card.Header>
                    <span>
                        { post.username }
                    </span>{' '}
                    posted on { post.createdAt }
                </Card.Header>
                <Card.Body>
                    { post.postText }
                </Card.Body>
            </Card>

            {post.commentCount > 0 && <CommentList comments={post.comments} />}
            {Auth.loggedIn() && <CommentForm postId={post._id} />}
        </>
    );
};

export default SinglePost;
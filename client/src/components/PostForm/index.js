import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

const PostForm = () => {
    const [postText, setPostText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [addPost, { error }] = useMutation(ADD_POST, {
        update(cache, { data: {addPost } }) {
            try {
                const { posts } = cache.readQuery({ query: QUERY_POSTS});

                cache.writeQuery({
                    query: QUERY_POSTS,
                    data: { posts: [addPost, ...posts] }
                });
            } catch (error) {
                console.error(error);
                setShowAlert(true);
            }

            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, posts: [...me.posts, addPost] } }
            });
        }
    });

    const handleChange = event => {
        if(event.target.value.length <= 1000) {
            setPostText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            await addPost({
                variables: { postText }
            });

            setPostText('');
            setCharacterCount(0);
        } catch (error) {
            console.error(error);
            setShowAlert(true);
        }
    };

    return(
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                Something went wrong with your post! :(
            </Alert>
            <Form.Group controlId='postText'>
                <Form.Label htmlFor='characterCount'>Character Count: { characterCount }/1000</Form.Label>
                <Form.Control
                    type='text'
                    as='textarea'
                    placeholder='Add a new Post? Share your thoughts and opinions...'
                    name='postText'
                    value={postText}
                    onChange={handleChange}
                    required
                    />
                    <Form.Control.Feedback type='invalid'>Your post can't be empty!</Form.Control.Feedback>
            </Form.Group>
            <Button
                disabled={!(postText)}
                type='submit'
                variant='outline-primary'>
                    Submit your Post
                </Button>
        </Form>
    );
};

export default PostForm;
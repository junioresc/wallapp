import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS} from '../../utils/queries';

const PostForm = () => {
    const [postText, setPostText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [showAlert, setShowAlert] = useState(false);

    const [addPost, { error }] = useMutation(ADD_POST, {
        update(cache, { data: { addPost } }) {
            try {
                const { posts } = cache.readQuery({ query: QUERY_POSTS });
                cache.modify({
                    fields: {
                        posts(existingPosts = []) {
                            const newPostRef = cache.writeQuery({
                                data: { posts: [addPost, ...posts] },
                                query: QUERY_POSTS
                            });
                            return [...existingPosts, newPostRef]
                        }
                    }
                })
    
                
            } catch (error) {
                console.error(error);
            }
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
        <Form onSubmit={handleFormSubmit} className="d-flex flex-column container">
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                {error ? error.message : 'Something went wrong with your post! :(' }
            </Alert>
            <Form.Group>
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
            </Form.Group>
            <Button
                disabled={!(postText)}
                type='submit'
                variant='outline-primary'
                className='m-2 align-self-center'>
                    Submit your Post
                </Button>
        </Form>
    );
};

export default PostForm;
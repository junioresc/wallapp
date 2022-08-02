import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

const CommentForm = ({ postId }) => {
    const [commentText, setCommentText] = useState('');
    const [characterCount, setCharacterCount ] = useState(0);
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleChange = event => {
        if(event.target.value.length <= 1000) {
            setCommentText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        
        const form = event.currentTarget;
        if(form.validity === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            await addComment({
                variables: { commentText, postId }
            });

            setCommentText('');
            setCharacterCount(0);
        } catch (error) {
            console.error(error)
            setShowAlert(true);
        }
    };

    return(
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                Something went wrong adding your comment, Please try again.
            </Alert>
            <Form.Group controlId='commentText'>
                <Form.Label htmlFor='characterCount'>Character Count: { characterCount }/ 1000</Form.Label>
                <Form.Control
                    type='text'
                    as='textarea'
                    placeholder='Have something interesting to add to the conversation? Share your thoughts!'
                    name='commentText'
                    value={commentText}
                    onChange={handleChange}
                    required
                    />
                    <Form.Control.Feedback type='invalid'>Your comment can't be empty!</Form.Control.Feedback>
            </Form.Group>
            <Button
                disabled={!(commentText)}
                type='submit'
                variant='outline-primary'>
                    Add your comment
                </Button>
        </Form>
    );
};

export default CommentForm;
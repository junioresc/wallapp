import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

const CommentForm = ({ postId }) => {
    const [commentBody, setCommentBody] = useState('');
    const [characterCount, setCharacterCount ] = useState(0);
    const [showAlert, setShowAlert] = useState(false);

    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleChange = event => {
        if(event.target.value.length <= 1000) {
            setCommentBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            await addComment({
                variables: { commentBody, postId }
            });

            setCommentBody('');
            setCharacterCount(0);
        } catch (error) {
            console.error(error)
            setShowAlert(true);
        }
    };

    return(
        <Form onSubmit={handleFormSubmit} className="d-flex flex-column container">
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                {error ? error.message : 'Something went wrong adding your comment, Please try again.' }
            </Alert>
            <Form.Group>
                <Form.Label htmlFor='characterCount'>Character Count: { characterCount }/ 1000</Form.Label>
                <Form.Control
                    type='text'
                    as='textarea'
                    placeholder='Have something interesting to add to the conversation? Share your thoughts!'
                    name='commentBody'
                    value={commentBody}
                    onChange={handleChange}
                    required
                    />
            </Form.Group>
            <Button
                disabled={!(commentBody)}
                type='submit'
                variant='outline-primary'
                className='m-2 align-self-center'>
                    Add your comment
                </Button>
        </Form>
    );
};

export default CommentForm;
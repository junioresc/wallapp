import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [addUser] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUserFormData({
            ...userFormData,
            [name]: value
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        try {
            const { data } = await addUser({
                variables: { ...userFormData }
            });
            Auth.login(data.addUser.token);
        } catch (error) {
            console.error(error);
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            email: '',
            password: ''
        });
    };

    return (
        <main>
            <div>
                <Card>
                    <Card.Header>Login</Card.Header>
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                                Something went wrong signing up, Please try again.
                            </Alert>
                            <Form.Group>
                                 <Form.Label htmlFor='username'>Username</Form.Label>
                                    <Form.Control
                                    type='text'
                                    placeholder='Enter your username'
                                    name='username'
                                    value={userFormData.username}
                                    onChange={handleChange}
                                    required
                                    />
                                    <Form.Control.Feedback type='invalid'>A username is required!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                 <Form.Label htmlFor='email'>Email Address</Form.Label>
                                    <Form.Control
                                    type='email'
                                    placeholder='Enter your email'
                                    name='email'
                                    value={userFormData.email}
                                    onChange={handleChange}
                                    required
                                    />
                                    <Form.Control.Feedback type='invalid'>An email is required!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                 <Form.Label htmlFor='password'>Enter your password</Form.Label>
                                    <Form.Control
                                    type='password'
                                    placeholder='Enter a password'
                                    name='password'
                                    value={userFormData.password}
                                    onChange={handleChange}
                                    required
                                    />
                                    <Form.Control.Feedback type='invalid'>A password is required!</Form.Control.Feedback>
                            </Form.Group>
                            <Button
                                disabled={!(userFormData)}
                                type='submit'
                                variant='outline-primary'>
                                    Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </main>
    );
};

export default Signup;
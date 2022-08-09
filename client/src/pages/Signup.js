import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import HeroBg from '../components/HeroBg';

const Signup = () => {
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
    const [showAlert, setShowAlert] = useState(false);

    const [addUser, { error }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUserFormData({
            ...userFormData,
            [name]: value
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await addUser({
                variables: { ...userFormData }
            });
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
            <Container fluid='sm' className='d-flex align-self-stretch'>
                <Row xs={1} md={1} lg={2}>
                    <Col className='d-flex'>
                        <HeroBg />
                    </Col>
                    <Col className='d-flex'>
                        <Card className='d-flex justify-self-center shadow p-2 mb-5 bg-white rounded w-100 h-100'>
                            <Card.Header className='text-center bg-white'>Join our Community!</Card.Header>
                            <Card.Body className='text-center'>
                                <Form onSubmit={handleFormSubmit}>
                                    <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                                        {error ? error.message : 'Something went wrong signing up, Please try again.' }
                                    </Alert>
                                    <Form.Group className='mb-2'>
                                        <Form.Label htmlFor='username'>Username:</Form.Label>
                                            <Form.Control
                                            type='text'
                                            placeholder='Enter a username'
                                            name='username'
                                            value={userFormData.username}
                                            onChange={handleChange}
                                            required
                                            />
                                            <Form.Control.Feedback type='invalid'>A username is required!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className='mb-2'>
                                        <Form.Label htmlFor='email'>Email Address:</Form.Label>
                                            <Form.Control
                                            type='email'
                                            placeholder='Enter a valid email'
                                            name='email'
                                            value={userFormData.email}
                                            onChange={handleChange}
                                            required
                                            />
                                            <Form.Control.Feedback type='invalid'>A valid email must be entered!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className='mb-2'>
                                        <Form.Label htmlFor='password'>Enter a secure password:</Form.Label>
                                            <Form.Control
                                            type='password'
                                            placeholder='*********'
                                            name='password'
                                            value={userFormData.password}
                                            onChange={handleChange}
                                            required
                                            />
                                            <Form.Control.Feedback type='invalid'>A password is required and must be longer than 5 characters!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Button
                                        disabled={!(userFormData.username && userFormData.email && userFormData.password)}
                                        type='submit'
                                        variant='outline-primary'
                                        className='m-2'>
                                            Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default Signup;
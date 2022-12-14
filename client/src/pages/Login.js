import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeroBg from '../components/HeroBg';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { motion } from 'framer-motion';


const Login = props => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [showAlert, setShowAlert] = useState(false);

    const [login, { error }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { ...formState }
            });
            Auth.login(data.login.token);
        } catch (error) {
            console.log(error);
            setShowAlert(true);
        }

        setFormState({
            email: '',
            password: ''
        });
    };

    return (
        <motion.main
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <Container fluid='sm' className='d-flex align-self-stretch'>
                <Row xs={1} md={1} lg={2}>
                    <Col className='d-flex'>
                        <HeroBg />
                    </Col>
                    <Col className='d-flex'>
                        <Card className='d-flex justify-self-center shadow p-2 mb-5 bg-white rounded w-100 h-100'>
                            <Card.Header className='text-center bg-white'>Login to your account below!</Card.Header>
                            <Card.Body className='text-center'>
                                <Form onSubmit={handleFormSubmit}>
                                    <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                                        {error && error.message === 'Please confirm your email to login' ? error.message : 'Incorrect credentials, Please try again.' }
                                    </Alert>
                                    <Form.Group className='mb-2'>
                                        <Form.Label htmlFor='email'>Email Address:</Form.Label>
                                            <Form.Control
                                            type='email'
                                            placeholder='Enter your email'
                                            name='email'
                                            value={formState.email}
                                            onChange={handleChange}
                                            required
                                            />
                                            <Form.Control.Feedback type='invalid'>A valid email must be entered!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className='mb-2'>
                                        <Form.Label htmlFor='password'>Password:</Form.Label>
                                            <Form.Control
                                            type='password'
                                            placeholder='******'
                                            name='password'
                                            value={formState.password}
                                            onChange={handleChange}
                                            required
                                            />
                                            <Form.Control.Feedback type='invalid'>Your password can't be empty!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Button
                                        disabled={!(formState.email && formState.password)}
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
        </motion.main>
    );
};

export default Login;
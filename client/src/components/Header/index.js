import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import Auth from '../../utils/auth';
import fullLogo from '../../imgs/fullLogo.png';

const Header = () => {

    const logout = event => {
        event.preventDefault();
        Auth.logout();
    }

    return(
        <header>
            <Navbar sticky="top" className='bg-white'>
                <Container>
                <Navbar.Brand href="/">
                    <img
                    src={fullLogo}
                    width="300"
                    height="100"
                    className="d-inline-block align-top img-fluid"
                    alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Nav>
                {Auth.loggedIn() ? (
                        <div className='d-flex w-100 justify-content-around container-fluid'>
                            <Nav.Link href='/profile'>My Profile</Nav.Link>
                            <Nav.Link href="/" onClick={logout} className='px-2'>Logout</Nav.Link>
                        </div>
                    ) : (
                        <div className="d-flex w-100 justify-content-around container-fluid">
                            <Nav.Link href='/login'>Login</Nav.Link>
                            <Nav.Link href='/signup'>Signup</Nav.Link>
                        </div>
                    )}
                </Nav>
                </Container>
            </Navbar> 
        </header>
    );
};

export default Header;
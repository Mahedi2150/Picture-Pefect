import React from 'react';
import './Header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';
import { signOut } from 'firebase/auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Header = () => {
    const [user] = useAuthState(auth)
    const handleSignout = () => {
        signOut(auth)
        toast.success(`Log out !!! ${user?.displayName}`, {
            theme: "dark",

        });
    }
    if (user?.email) {
        toast.success(`Log in SuccessFul !!! ${user?.displayName}`, {
            theme: "dark",

        });
    }
    return (
        <nav style={{
            position: 'sticky', top: '0', zIndex: 1
        }} >
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                <Container>
                    <Navbar.Brand as={Link} to="/">Picture Perfect</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/home">Home</Nav.Link>
                            <Nav.Link as={Link} to="/service">Service</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>

                        </Nav>
                        <Nav>
                            {
                                user ?
                                    <div className='profile'>
                                        <img style={{ width: "40px ", borderRadius: "50%", filter: 'grayscale(100%)', }} src={user.photoURL} alt="" />
                                        <p style={{ color: "white", margin: "10px" }}>{user?.displayName}</p>
                                        <button className='btn btn-link text-white text-decoration-none' onClick={handleSignout}>Sign Out</button>
                                    </div>
                                    :
                                    <Nav.Link eventKey={2} as={Link} to="login">
                                        Log in
                                    </Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <ToastContainer />
        </nav >
    );
};

export default Header;
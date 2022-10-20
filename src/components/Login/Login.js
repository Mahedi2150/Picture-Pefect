import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import google from '../../image/Google.png'
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../Loading/Loading';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const navigate = useNavigate()
    const navigateToRegister = () => {
        navigate('/register')
    }
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';




    const emailRef = useRef('')
    const passwordRef = useRef('')


    const [
        signInWithEmailAndPassword,
        user1,
        loading1,
        error1,
    ] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    if (loading || loading1 || sending) {
        return <Loading></Loading>
    }

    if (error || error1) {
        <p className='text-danger'>Error: {error?.message}</p>

    }

    const handleSubmit = event => {
        event.preventDefault()
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        signInWithEmailAndPassword(email, password);
    }
    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast.info('Sent email');
        } else {
            toast.warn('Please enter your email')
        }
    }

    if (user || user1) {
        navigate(from, { replace: true })

    }
    return (
        <div className='container w-50 mx-auto'>
            <h2 className='text-dark text-center mt-2'>Please Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3 " controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                {error}
                <Button variant="dark" type="submit">
                    Submit
                </Button>
            </Form>
            <p>New to Genius Car? <small style={{ cursor: "pointer" }} className='text-dark' onClick={navigateToRegister}> Please Register</small></p>
            <p>Forget Password? <small style={{ cursor: "pointer" }} className='text-dark' onClick={resetPassword}> Reset Password</small></p>
            <button
                onClick={() => signInWithGoogle()}
                className='btn btn-outline-dark btn-lg d-block w-50 mx-auto my-2'>
                <img src={google} style={{ filter: 'grayscale(100%)' }} alt="" />
                <span className='mx-1'> Google Sign In</span>
            </button>
            <ToastContainer />
        </div>
    );
};

export default Login;
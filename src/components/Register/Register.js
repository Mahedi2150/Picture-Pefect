import React, { useState } from 'react';
import './Register.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import Loading from '../Loading/Loading';
import auth from './../../firebase.init';


const Register = () => {
    const [agree, setAgree] = useState(false)
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);


    const location = useLocation()
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate()
    const navigateToLogin = () => {
        navigate('/login')
    }

    if (loading || updating) {
        return <Loading></Loading>
    }
    const handleRegister = async (event) => {
        event.preventDefault()
        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        const agree = event.target.terms.checked


        await createUserWithEmailAndPassword(email, password);

        await updateProfile({ displayName: name });
        alert('Updated profile');
        console.log(user);
    }
    if (user) {
        navigate(from, { replace: true })
    }
    return (
        <div className='register-form'>
            <h2 className='text-center my-5'>Please Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" name="name" id="" placeholder='Your name' />

                <input type="email" name="email" id="" placeholder='Email Address' required />

                <input type="password" name="password" id="" placeholder='Password' required />
                <input onClick={() => setAgree(!agree)} type="checkbox" name="terms" id="terms" />
                <label
                    className={`ps-2 ${agree ? 'text-primary' : 'text-dark'}`}
                    htmlFor="terms">Accept Genius car terms and condition</label>
                <input
                    disabled={!agree}
                    className='mt-2 btn btn-dark'
                    type="submit"
                    value='Register' />
            </form>
            <p>Already have an account ? <small style={{ cursor: "pointer" }} className='text-dark' onClick={navigateToLogin}> Please Login</small></p>



        </div>
    );
};

export default Register;
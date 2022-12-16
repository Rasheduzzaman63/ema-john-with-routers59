import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';

const Login = () => {
    const [userError, setUserError] = useState(null)
    const [loginSuccess, setLoginSuccess] = useState(null)
    const {logInUser, loading} = useContext(AuthContext)

    const location = useLocation()
    const from = location.state?.from?.pathname || '/';
   

    // use to useNavigate hook
    const navigate = useNavigate()

    

    const handleSubmit = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        logInUser(email, password)
        .then(result =>{
            const user = result.user;
            setLoginSuccess(user);
            form.reset();
            navigate(from, {replace:true})
            console.log(user)
        })
        .catch(error =>{
            setUserError(error.message)
            form.reset();
            console.error(error)
        })
    }

   
    return (
        <div className='form-container'>
        <h1 className='form-title'>Login</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="" placeholder='Email' required/>
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" placeholder='password' required/>
            </div>

            {

                <input className='btn-submit' type="submit" value="Login" />}
            {
                loginSuccess && <p>Login User Successfully</p>
            }
            <p>{userError}</p>
            
           
        </form>
        <p className='new-pragraph'>New to Ema-john<Link to='/signup'> Create New Account</Link></p>
    </div>
    );
};

export default Login;
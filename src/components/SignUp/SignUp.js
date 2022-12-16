import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './SignUp.css'

const SignUp = () => {
    const [user, setUser]= useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const {createUser} = useContext(AuthContext)

    const handleSubmit = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm)
        

        if(password.length < 6){
            setPasswordError('Password Must be greather then six character');
            return;
        }
        if(password !== confirm){
            setPasswordError('Password did not match !')
            return;
        }

        createUser(email, password)
        .then(result =>{
            const user = result.user;
            setUser(user)
            form.reset();
            console.log(user)
        })
        .catch(error => console.error(error))
        
    }
    return (
        <div className='form-container'>
            <h1 className='form-title'>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" placeholder='Email' required/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" placeholder='Password' required/>
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" id="" placeholder='Confirm Password' required/>
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
                <p className='error-message'>{passwordError}</p>
            </form>
            {
                user && <p>Create User Successfully.</p>
            }
            <p className='new-pragraph'>Already have an Account <Link to='/login'>Login</Link></p>
        </div>
    );
};

export default SignUp;
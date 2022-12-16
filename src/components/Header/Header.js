import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import logo from '../../images/Logo.svg';
import './Header.css';

const Header = () => {
    const {user, lotOut} = useContext(AuthContext)

    const handleLogOut =() =>{
        lotOut()
        .then( () =>{}).catch(error => console.error(error))
    }

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {
                    user?.email?
                    <>
                    <button className='mail-btn'>WellCome {user.email}</button>
                    <button onClick={handleLogOut}>Log Out </button>
                    </>
                    :
                    <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                    </>
                }
                
                
            </div>
        </nav>
    );
};

export default Header;
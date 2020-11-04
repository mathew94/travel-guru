import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className = 'header'>
            <nav >
                <img src={logo} alt=""/>
                <Link to="/home">Home</Link>
                <Link to="/news">News</Link>
                <Link to="/destination">Destination</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/contact">Contact</Link>
                <button id = 'btn-login'><Link to="/login">Login</Link></button>
            </nav>
            
            
            
        </div>
    );
};

export default Header;
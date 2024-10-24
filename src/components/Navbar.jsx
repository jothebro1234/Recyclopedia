import './navbar.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/sigh.png';
import menu from '../assets/menuicon.svg';
import cross from '../assets/menuicon.svg';

const Navbar = () => {
    
    const [toggle, setToggle] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const handleClick = () => setToggle(!toggle);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
        if (window.innerWidth > 768) {
            setToggle(false); 
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className="navbar">
            <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400" rel="stylesheet"></link>
            <img className="logo" src={logo} alt="Logo" />
            
            {isMobile && (
                <div className='burger_menu' onClick={handleClick}>
                    <img className='menuopen' src={toggle ? cross : menu} alt="Menu Toggle" />
                </div>
            )}

            <div className={`nav-links ${toggle ? 'active' : ''}`}>
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/significance">Significance</Link>
                <Link className="nav-link" to="/start">Start</Link>
                <Link className="nav-link" to="/contact">Meet Us</Link>
                
            </div>
        </nav>
    );
}

export default Navbar;

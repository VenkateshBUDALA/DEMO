import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const NavBarCom = () => {
    const [activeButton, setActiveButton] = useState('/'); // Set the default active button

    const handleButtonClick = (path) => {
        setActiveButton(path); // Update the active button when clicked
    };

    return (
        <nav style={{ display: 'flex', gap: '50px', justifyContent: 'center', background: '#e3f2fd' }}>
            <Link 
                to="/" 
                className={`navbar-button button-user ${activeButton === '/' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('/')} >
                U S E R
            </Link>
            <Link 
                to="/SystemCom" 
                className={`navbar-button button-system ${activeButton === '/SystemCom' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('/SystemCom')}>
                S Y S T E M
            </Link>
            <Link 
                to="/UsbCom" 
                className={`navbar-button button-usb ${activeButton === '/UsbCom' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('/UsbCom')}>
                U S B
            </Link>
            <Link 
                to="/PolicyCom" 
                className={`navbar-button button-policy ${activeButton === '/PolicyCom' ? 'active' : ''}`} 
                onClick={() => handleButtonClick('/PolicyCom')}>
                P O L I C Y
            </Link>
            {/* Add more links as needed */}
        </nav>
    );
};

export default NavBarCom;

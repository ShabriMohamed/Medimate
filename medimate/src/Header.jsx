import React from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom'; 
import './Header.css'; 

const Header = () => {
  return (
    <header>
      <Helmet>
        {/* External resources */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Play&display=swap" />
      </Helmet>

      <div className="logo-container">
        
        <p className="logo-text">
          <span className="logo-text-medi">Medi</span>mate
        </p>
      </div>

      <input type="checkbox" className="btn" id="check" />
      <label htmlFor="check" className="menu2">
        <i className='bx bx-menu' id="menu-icon"></i>
        <i className='bx bx-x' id="close-icon"></i>
      </label>

      <div className="nav">
        <ol>
          <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
          <li><NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>Services</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink></li>
          <li><NavLink to="/disease-prediction" className={({ isActive }) => (isActive ? 'active' : '')}>Disease Prediction</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink></li>
        </ol>
      </div>

    </header>
  );
}

export default Header;

// Footer.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'; 
const Footer = () => {
  return (
    <footer className="footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
      <ul className="social-icon">
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </li>
      </ul>
      <ul className="menu">
        <li className="menu__item"><a className="menu__link" href="/">Home</a></li>
        <li className="menu__item"><a className="menu__link" href="/about">About</a></li>
        <li className="menu__item"><a className="menu__link" href="#">Services</a></li>
        <li className="menu__item"><a className="menu__link" href="/contact">Contact</a></li>
      </ul>
      <p>&copy;2024 Medimate | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;

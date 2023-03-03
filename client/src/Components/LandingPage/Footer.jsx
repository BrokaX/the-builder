import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__social-media">
        <a href="https://www.facebook.com/"><FaFacebook className="footer__icon" /></a>
        <a href="https://www.twitter.com/"><FaTwitter className="footer__icon" /></a>
        <a href="https://www.instagram.com/"><FaInstagram className="footer__icon" /></a>
      </div>
      <div className="footer__copyright">
        © {currentYear} Abbes. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-copyright">Blume Haus NP @ {2025}</p>
       
      </div>
    </footer>
  );
}

export default Footer;
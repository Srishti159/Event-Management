// Footer.js
import React from 'react';
import './../assets/styles.css'; // You can add styles for the footer here

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 Your Company. All rights reserved.</p>
        <p>
          <a href="/terms" className="footer-link">Terms of Service</a> | 
          <a href="/privacy" className="footer-link">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

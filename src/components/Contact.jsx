import React from 'react';
import './Contact.css'; // Import the external CSS file

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">
       
        <div className="social-links">
           <h3>FOLLOW US</h3>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
        </div>
       
        <div className="contact-card">
          <h3>CONTACT US</h3>
          <p><strong>Email:</strong> Kluniversity@email.com</p>
          <p><strong>Mobile:</strong> +91 6309991786</p>
        
        </div>
      </div>
    </div>
  );
}

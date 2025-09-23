import React from 'react';
import './About.css'; // Import the external CSS file

export default function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <img 
          src="src/components/AboutUs.png" 
          alt="About Us" 
          className="about-image"
        />
      </div>
    </div>
  );
}

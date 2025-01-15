import React from 'react';
import './About.css';
import profile from '../assets/profile.jpg';

import { FaLinkedin, FaEnvelope, FaGlobe, FaYoutube } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Me</h1>
      <div className="about-content">
        <div className="about-card">
          <div className="about-image">
          <img src={profile} alt="Vikas Bansode" className="profile-image" />
          </div>
          <div className="about-info">
            <p>
              Hello! I'm <strong>Vikas Bansode</strong>, a passionate web developer with experience in creating modern, responsive websites and web applications.
            </p>
            <p>
              I specialize in front-end technologies like React, JavaScript, HTML, and CSS. My back-end skills include Django and Python. I enjoy tackling challenges and staying updated with the latest tech trends.
            </p>
          </div>
        </div>

        <div className="about-card contact-card">
          <h2>Contact Information</h2>
          <ul>
            <li>
              <a href="mailto:vikasbansode804@gmail.com" target="_blank" rel="noopener noreferrer">
                <FaEnvelope className="contact-icon" /> Email
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/vikas-bansode/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="contact-icon" /> LinkedIn
              </a>
            </li>
            <li>
              <a href="https://vikass19.github.io/wiki.github.io/#home" target="_blank" rel="noopener noreferrer">
                <FaGlobe className="contact-icon" /> Portfolio
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@fixerror29" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="contact-icon youtube-icon" /> YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;

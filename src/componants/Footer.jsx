import React, { useState } from "react";
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" or "error"

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscription = async (e) => {
    e.preventDefault();

    if (!email) {
      setStatusMessage("Email is required!");
      setStatusType("error");
      return;
    }

    if (!validateEmail(email)) {
      setStatusMessage("Invalid email format. Please enter a valid email.");
      setStatusType("error");
      return;
    }

    try {
      const response = await fetch("http://54.252.157.69/api/subscribe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setStatusMessage(data.message || "Subscription successful!");
        setStatusType("success");
        setEmail("");
      } else {
        const error = await response.json();
        setStatusMessage(error.error || "An error occurred");
        setStatusType("error");
      }
    } catch (err) {
      setStatusMessage("Network error. Please try again.");
      setStatusType("error");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <h1 className="footer-logo">Tech Stories</h1>
          <p>Your daily dose of tech news and tutorials.</p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#blogs">Blogs</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription Section */}
        <div className="footer-newsletter">
          <h3>Subscribe to Our Newsletter</h3>
          <form onSubmit={handleSubscription}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email Address"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          {statusMessage && (
            <p className={`subscription-status ${statusType}`}>
              {statusMessage}
            </p>
          )}
        </div>

        {/* Social Media Section */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#facebook" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#twitter" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#instagram" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#linkedin" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tech Stories. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

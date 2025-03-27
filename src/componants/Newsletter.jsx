import React, { useState, useEffect, useRef } from "react";
import "./Newsletter.css";

const Newsletter = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" or "error"
  const [position, setPosition] = useState({ top: "50%", left: "50%" });

  const modalRef = useRef(null);

  // Function to set a random position
  const setRandomPosition = () => {
    const randomTop = Math.random() * 60 + 10; // 10% to 70%
    const randomLeft = Math.random() * 60 + 10; // 10% to 70%
    setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  useEffect(() => {
    setRandomPosition();
  }, []);

  // Close the modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Hide the newsletter box
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

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
      const response = await fetch("http://54.252.157.69/api/newsletter/subscribe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatusMessage("You have successfully subscribed!");
        setStatusType("success");
        setEmail("");
      } else {
        const error = await response.json();
        setStatusMessage(error.message || "An error occurred. Please try again.");
        setStatusType("error");
      }
    } catch (err) {
      setStatusMessage("Network error. Please try again.");
      setStatusType("error");
    }
  };

  return (
    <div className="newsletter-overlay">
      <div className="newsletter-container" ref={modalRef} style={{ top: position.top, left: position.left }}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>📩 Stay Updated!</h2>
        <p>Subscribe to our newsletter for the latest tech updates.</p>

        <form className="newsletter-form" onSubmit={handleSubscription}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>

        {statusMessage && <p className={`newsletter-status ${statusType}`}>{statusMessage}</p>}
      </div>
    </div>
  );
};

export default Newsletter;

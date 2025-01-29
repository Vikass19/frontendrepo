import React, { useState } from "react";
import "./Newsletter.css";

const Newsletter = () => {
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
      const response = await fetch("http://54.252.157.69:8000/api/newsletter/subscribe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatusMessage("You have successfully subscribed to our newsletter!");
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
    <div className="newsletter">
      <div className="newsletter-container">
        <h2 className="newsletter-title">Stay Updated with Our Blog</h2>
        <p className="newsletter-description">
          Subscribe to our newsletter to get the latest blog updates, tutorials, and tech news delivered straight to your inbox.
        </p>

        <form className="newsletter-form" onSubmit={handleSubscription}>
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
          <p className={`newsletter-status ${statusType}`}>
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Newsletter;

// src/components/AuthModal.js
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthModal = ({ isVisible, onClose }) => {
  const { loginWithRedirect } = useAuth0();

  if (!isVisible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Welcome to Our Blog</h2>
        <p>Please log in to enhance your experience and post comments.</p>
        <button
          onClick={() => loginWithRedirect()}
          style={styles.loginButton}
        >
          Login with Google
        </button>
        <button onClick={onClose} style={styles.closeButton}>
          Skip
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  loginButton: {
    padding: "10px 15px",
    backgroundColor: "#4285F4",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px",
  },
  closeButton: {
    padding: "10px 15px",
    backgroundColor: "#ccc",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AuthModal;

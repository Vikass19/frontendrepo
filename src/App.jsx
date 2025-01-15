import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./componants/Navbar";
import PostList from "./componants/PostList";
import PostDetail from "./componants/PostDetail";
import About from "./componants/About";
import Contact from "./componants/Contact";
import AuthModal from "./componants/AuthModal";
import Footer from "./componants/Footer";
import ScrollToTop from "./componants/ScrollToTop";




const App = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState(null); // Category state
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const [categories, setCategories] = useState([]); // For initializing categories

  // Dark Mode Toggle
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setCategory(category);
  };

  // Initialize app
  const init = () => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/categories/");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Failed to fetch categories.");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    // Call necessary setup tasks
    fetchCategories();

    // Check if modal has been seen
    const hasSeenModal = localStorage.getItem("hasSeenModal");
    if (!hasSeenModal) {
      setShowModal(true);
    }
  };

  // Save user data after login
  useEffect(() => {
    if (isAuthenticated) {
      fetch("http://127.0.0.1:8000/api/user-profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          picture: user.picture,
        }),
      })
        .then((res) => {
          if (res.ok) {
            console.log("User data saved successfully.");
          } else {
            console.error("Error saving user data.");
          }
        })
        .catch((error) => {
          console.error("Network error:", error);
        });
    }
  }, [isAuthenticated, user]);

  // Run init on app load
  useEffect(() => {
    init();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem("hasSeenModal", "true");
  };

  return (
    <Router>
      <AuthModal isVisible={showModal} onClose={handleCloseModal} />
      <div style={{ textAlign: "right", padding: "10px" }}>
        {isAuthenticated ? (
          <div>
            <h2>Welcome, {user.name}</h2>
            <img
              src={user.picture}
              alt={user.name}
              style={{
                borderRadius: "50%",
                width: "50px",
                marginRight: "10px",
                verticalAlign: "middle",
              }}
            />
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              style={{
                padding: "10px 15px",
                backgroundColor: "green",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            style={{
              padding: "10px 15px",
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Login with Google
          </button>
        )}
      </div>

      <Navbar setSearchQuery={setSearchQuery} categories={categories} />

      {/* Dark Mode Toggle */}
      

      <div
        style={{
          backgroundColor: darkMode ? "#000000" : "#fff",
          color: darkMode ? "#fff" : "#000",
        }}
      >        <Routes>
          <Route
            path="/"
            element={<PostList searchQuery={searchQuery} category={category} />}
          />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/category/:category"
            element={<PostList searchQuery={searchQuery} />}
          />

          
        </Routes>
       <ScrollToTop />
        <Footer />
        
      </div>
    </Router>
  );
};

export default App;

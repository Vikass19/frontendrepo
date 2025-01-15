import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../services/apis"; // Fetch categories service
import "./Navbar.css";
import tslog from "../assets/tslogo.webp";

const Navbar = ({ setSearchQuery }) => {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState([]); // Store fetched categories
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategories(); // Fetch categories from API
        setCategories(data); // Set categories data
      } catch (err) {
        setError("Error fetching categories");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories(); // Fetch categories on mount
  }, []);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryClick = () => {
    setIsCategoriesOpen(!isCategoriesOpen); // Toggle categories dropdown
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={tslog} alt="TechStories Logo" />
        </Link>

        {/* Hamburger Menu */}
        <div className="hamburger" onClick={toggleMenu}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>

        {/* Navbar Links */}
        <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </li>
          <li>
            {/* Categories Dropdown */}
            <button onClick={handleCategoryClick} className="category-button">
              Categories
            </button>
            {isCategoriesOpen && (
              <div className="categories-dropdown">
                {loading ? (
                  <div className="loading">Loading categories...</div>
                ) : error ? (
                  <div className="error">{error}</div>
                ) : (
                  <ul>
                    {categories.map((category) => (
                      <li
                        key={category.id}
                        className="category-item"
                        onClick={() => console.log(category)}
                      >
                        {category.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="navbar-extra">
          <div className="search-bar">
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

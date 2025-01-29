import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../services/apis"; // Fetch categories service
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
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={tslog} alt="TechStories Logo" className="h-10 w-10" />
          <span className="text-lg font-bold">TechStories</span>
        </Link>

        {/* Hamburger Menu */}
        <button
          className="text-white block sm:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Navbar Links */}
        <ul
          className={`sm:flex sm:space-x-4 items-center transition-all duration-300 ease-in-out ${
            isMenuOpen ? "block" : "hidden"
          } sm:block absolute sm:relative bg-gray-900 sm:bg-transparent w-full sm:w-auto top-16 sm:top-0 left-0 sm:left-auto text-center sm:text-left p-4 sm:p-0`}
        >
          <li className="py-2 sm:py-0">
            <Link
              to="/"
              className="hover:text-teal-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="py-2 sm:py-0">
            <Link
              to="/about"
              className="hover:text-teal-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li className="py-2 sm:py-0 relative">
            <button
              onClick={handleCategoryClick}
              className="hover:text-teal-400 transition-colors duration-300 focus:outline-none"
            >
              Categories
            </button>
            {isCategoriesOpen && (
              <div className="absolute left-0 top-full bg-gray-800 shadow-lg rounded-md mt-2 z-10 w-48">
                {loading ? (
                  <div className="p-4 text-center">Loading...</div>
                ) : error ? (
                  <div className="p-4 text-center text-red-500">{error}</div>
                ) : (
                  <ul className="text-sm">
                    {categories.map((category) => (
                      <li
                        key={category.id}
                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
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
          <li className="py-2 sm:py-0">
            <Link
              to="/contact"
              className="hover:text-teal-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center space-x-2">
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-teal-400"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

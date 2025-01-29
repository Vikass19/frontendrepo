import axios from 'axios';

// Base API URL (adjust this as needed for your backend)
const API_BASE_URL = 'http://54.252.157.69:8000/api/'; // Base URL for API

// Fetch all posts
export const getPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// Fetch a single post by ID
export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw error;
  }
};

// Alias for getPostById
export const getPost = getPostById;

// Fetch comments for a specific post
export const getComments = async (postId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/comments/`, {
      params: { post: postId }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for post ID ${postId}:`, error);
    throw error;
  }
};

// Add a new comment to a specific post
export const addComment = async (postId, commentData) => {
  try {
    const token = localStorage.getItem('authToken');

    const response = await axios.post(`${API_BASE_URL}/comments/`, {
      post: postId,
      text: commentData.text,
      author: commentData.author || 'Anonymous',
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding comment to post ID ${postId}:`, error);
    throw error;
  }
};

// Fetch categories (existing function)
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories/`);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Fetch User Profile (Authenticated)
export const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${API_BASE_URL}/user/profile/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register/`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// User login (Authentication)
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login/`, credentials);
    localStorage.setItem('authToken', response.data.token); // Store the token
    return response.data; // Return user data or token as needed
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};


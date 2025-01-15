import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Postlist.css";

const PostList = ({ searchQuery, category, setCategory }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const postsPerPage = 5;

  const categories = ["Technology", "Health", "Education", "Sports"]; // Example categories

  useEffect(() => {
    const fetchPosts = async () => {
      let url = `http://localhost:8000/api/posts/`;
      let params = [];

      if (searchQuery) {
        params.push(`search=${searchQuery}`);
      }

      if (category) {
        params.push(`category=${category}`);
      }

      if (params.length > 0) {
        url += "?" + params.join("&");
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchQuery, category]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="post-list">
      

      <h1>Blog Posts</h1>
      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <>
          <div className="posts-grid">
            {currentPosts.map((post) => (
              <div key={post.id} className="post-card">
                <h2>{post.title}</h2>
                <Link to={`/post/${post.id}`}>Read More</Link>
              </div>
            ))}
          </div>
          <Pagination
            totalPosts={filteredPosts.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

const Pagination = ({ totalPosts, postsPerPage, currentPage, paginate }) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {pageNumbers.map((num) => (
        <button
          key={num}
          className={num === currentPage ? "active" : ""}
          onClick={() => paginate(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default PostList;

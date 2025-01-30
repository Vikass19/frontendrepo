import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../services/apis"; // Assuming this is the function to fetch posts
import './Postlist.css';

const PostList = ({ searchQuery, category }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      let url = `http://54.252.157.69/api/posts/`;
      let params = [];

      if (searchQuery) {
        params.push(`search=${searchQuery}`);
      }

      if (category) {
        params.push(`category=${category}`);
      }

      if (params.length > 0) {
        url += '?' + params.join('&');
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
  }, [searchQuery, category]); // Re-fetch posts when searchQuery or category changes

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-circle"></div>
      </div>
    );
  }

  return (
    <div className="post-list">
      <h1>Blog Posts</h1>
      {filteredPosts.length === 0 ? (
        <div className="no-posts">
          <i className="fas fa-exclamation-circle no-posts-icon"></i>
          <p>No Posts Found</p>
        </div>
      ) : (
        <>
          <div className="posts-grid">
            {currentPosts.map((post) => (
              <div key={post.id} className="post-card">
                {post.featured_image && (
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="post-image"
                  />
                )}
                <h2>{post.title}</h2>
                <div
                  className="post-content"
                  dangerouslySetInnerHTML={{
                    __html: post.content ? post.content.slice(0, 200) : '',
                  }}
                />
                <Link to={`/post/${post.id}`} className="read-more">
                  Read More
                </Link>
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
    <nav className="pagination">
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={number === currentPage ? 'active' : ''}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PostList;

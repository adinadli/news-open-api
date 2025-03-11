import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "dbbda79b4a1a4861a30574aeb39660e5";
const API_URL = "https://newsapi.org/v2/everything";

export default function NewsApp() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const pageSize = 6;
  const [user, setUser] = useState(localStorage.getItem("user") || null);

  useEffect(() => {
    fetchNews();
  }, [query, page]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: query,
          apiKey: API_KEY,
          page,
          pageSize,
        },
      });
      setArticles(response.data.articles);
      setError(null);
    } catch (err) {
      setError("Failed to fetch news. Please try again later.");
    }
  };

  const handleLogin = (username) => {
    localStorage.setItem("user", username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="container">
      {!user ? (
        <div className="auth-section">
          <input type="text" placeholder="Enter username" className="input" id="username" />
          <button onClick={() => handleLogin(document.getElementById("username").value)} className="btn-login">Login</button>
        </div>
      ) : (
        <div className="auth-section">
          <p className="welcome">Welcome, {user}!</p>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      )}
      <h1 className="title">News Search</h1>
      
      <input type="text" placeholder="Search news..." className="search-input" value={query} onChange={(e) => setQuery(e.target.value)} />
      {error && <p className="error">{error}</p>}
      <div className="news-grid">
        {articles.length === 0 && !error ? (
          <p className="no-results">No articles found.</p>
        ) : (
          articles.map((article, index) => (
            <div key={index} className="news-card">
              {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="news-image" />}
              <div className="news-content">
                <h2 className="news-title">{article.title}</h2>
                <p className="news-description">{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">Read more</a>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1} className="btn-page">Prev</button>
        <span className="page-number">Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} className="btn-page">Next</button>
      </div>
    </div>
  );
}
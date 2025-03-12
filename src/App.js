import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const API_KEY = "INSERT_API_KEY";
const API_URL = "https://newsapi.org/v2/everything";

export default function NewsApp() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const pageSize = 6;
  const [user, setUser] = useState(localStorage.getItem("user") || null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "", confirmPassword: "" });

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

  const handleLogin = () => {
    if (!credentials.username || !credentials.password) {
      alert("Please enter both username and password.");
      return;
    }
    localStorage.setItem("user", credentials.username);
    setUser(credentials.username);
    setIsPopupOpen(false);
    setCredentials({ username: "", password: "", confirmPassword: "" });
  };

  const handleRegister = () => {
    if (!credentials.username || !credentials.password || !credentials.confirmPassword) {
      alert("All fields are required.");
      return;
    }
    if (credentials.password !== credentials.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    localStorage.setItem("user", credentials.username);
    setUser(credentials.username);
    setIsPopupOpen(false);
    setCredentials({ username: "", password: "", confirmPassword: "" });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="container">
      {/* Authentication Section */}
      {!user ? (
        <div className="auth-section">
          <button onClick={() => { setIsPopupOpen(true); setIsRegister(false); }} className="btn-login">
            Login / Register
          </button>
        </div>
      ) : (
        <div className="auth-section">
          <p className="welcome">Welcome, {user}!</p>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      )}

      {/* Pop-up Login/Register */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button className="popup-close" onClick={() => setIsPopupOpen(false)}>×</button>
            <h2 className="popup-title">{isRegister ? "Register" : "Login"}</h2>
            <input
              type="text"
              placeholder="Username"
              className="popup-input"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            /><br></br>
            <input
              type="password"
              placeholder="Password"
              className="popup-input"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            /><br></br>
            {isRegister && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="popup-input"
                value={credentials.confirmPassword}
                onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
              />
            )}<br></br>
            <button className="popup-btn" onClick={isRegister ? handleRegister : handleLogin}>
              {isRegister ? "Register" : "Login"}
            </button>
            <p>
              {isRegister ? "Already have an account?" : "Don't have an account?"}<br></br>
              <button className="popup-btn" onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? "Login" : "Register"}
              </button>
            </p>
          </div>
        </div>
      )}

      {/* News Section */}
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

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1} className="btn-page">Prev</button>
        <span className="page-number">Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} className="btn-page">Next</button>
      </div>
    </div>
  );
}
/*import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Marketplace from "./components/Marketplace";
import NotificationsPage from "./components/NotificationsPage"; // Make sure this exists
import "./App.css"; // Make sure CSS for navbar exists

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Save token in localStorage when user logs in
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // If not logged in → show Register + Login
  if (!token) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Welcome to SlotSwapper</h2>
        <Register />
        <Login setToken={setToken} />
      </div>
    );
  }

  return (
    <Router>
      {/* Navigation Bar */
      /*<nav className="navbar">
        <Link to="/">Dashboard</Link>
        <Link to="/marketplace">Marketplace</Link>
        <Link to="/notifications">Notifications</Link>
        <button className="logout" onClick={() => setToken(null)}>Logout</button>
      </nav>

      {/* Main Routes */
      /*<div className="main-container">
        <Routes>
          <Route path="/" element={<Dashboard token={token} />} />
          <Route path="/marketplace" element={<Marketplace token={token} />} />
          <Route path="/notifications" element={<NotificationsPage token={token} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;*/

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Marketplace from "./components/Marketplace";
import NotificationsPage from "./components/NotificationsPage";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  if (!token) {
    return (
      <div className="auth-page">
        <h2>Welcome to SlotSwapper</h2>
        <Register />
        <Login setToken={setToken} />
      </div>
    );
  }

  return (
    <Router>
      {/* Navbar visible on all pages */}
      <nav className="navbar">
        <Link to="/">Dashboard</Link>
        <Link to="/marketplace">Marketplace</Link>
        <Link to="/notifications">Notifications</Link>
        <button className="logout" onClick={() => setToken(null)}>Logout</button>
      </nav>

      <div className="main-container">
        <Routes>
          <Route path="/" element={<Dashboard token={token} />} />
          <Route path="/marketplace" element={<Marketplace token={token} />} />
          <Route path="/notifications" element={<NotificationsPage token={token} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


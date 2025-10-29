import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Navbar = ({ cartCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="logo">🛍️ Vibe Mock</h2>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/checkout" className="nav-link" onClick={() => setMenuOpen(false)}>
            Checkout
          </Link>
          <Link to="/orders" className="nav-link" onClick={() => setMenuOpen(false)}>
            Order History
          </Link>
          <Link to="/cart" className="nav-link" onClick={() => setMenuOpen(false)}>
            Cart ({cartCount})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

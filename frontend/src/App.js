import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrdersPage from "./pages/orders";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // 🧠 Filter products dynamically
  useEffect(() => {
    let list = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }
    setFiltered(list);
  }, [search, category, products]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Router>
      <Navbar cartCount={cart.length} />

      <Routes>
        {/* 🏠 Home Page */}
        <Route
          path="/"
          element={
            <div className="app">
              <h1 className="title">🛒 Vibe Mock E-Commerce</h1>
              <h2 className="subtitle">🛍️ Our Products</h2>

              {/* 🔍 Search + Category Filter */}
              <div className="filters">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-bar"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="category-dropdown"
                >
                  <option value="All">All Categories</option>
                  <option value="Audio">Audio</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Tech">Tech</option>
                </select>
              </div>

              {/* 🧱 Product List */}
              <div className="product-grid">
                {filtered.map((product) => (
                  <div key={product._id} className="product-card">
                    <img
                      src={product.image || "https://via.placeholder.com/200"}
                      alt={product.name}
                    />
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="price">₹{product.price}</p>
                    <button
                      className="add-btn"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          }
        />

        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} setCart={setCart} />}
        />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </Router>
  );
}

export default App;

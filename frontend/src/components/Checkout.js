import React, { useState } from "react";
import "../App.css";

const Checkout = ({ cart, setCart }) => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!form.name || !form.email) {
      alert("⚠️ Please fill out your name and email!");
      return;
    }
    if (cart.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: cart,
          name: form.name,
          email: form.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Checkout failed");
      }

      const data = await response.json();
      setReceipt(data);
      setCart([]);
      alert("✅ Order placed successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1 className="title">💳 Checkout</h1>

      {receipt ? (
        <div className="receipt">
          <h2>✅ Order Successful!</h2>
          <p>
            <strong>Name:</strong> {receipt.name}
          </p>
          <p>
            <strong>Email:</strong> {receipt.email}
          </p>
          <p>
            <strong>Total:</strong> ₹{receipt.total}
          </p>
          <p>
            <strong>Time:</strong> {receipt.timestamp}
          </p>
          <p>{receipt.message}</p>

          <button
            onClick={() => window.location.assign("/orders")}
            className="checkout-btn"
          >
            View Order History
          </button>
        </div>
      ) : (
        <div className="checkout-form">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />

          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;

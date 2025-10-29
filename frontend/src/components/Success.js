import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function SuccessPage() {
  const { state } = useLocation();
  const receipt = state?.receipt;

  if (!receipt) {
    return (
      <div className="app">
        <h1>No recent order found 😅</h1>
        <Link to="/" className="checkout-btn">Go Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="app">
      <h1 className="title">🎉 Order Successful!</h1>
      <div className="receipt">
        <p><strong>🧾 Order ID:</strong> {receipt.id}</p>
        <p><strong>Name:</strong> {receipt.name}</p>
        <p><strong>Email:</strong> {receipt.email}</p>
        <p><strong>Total:</strong> ₹{receipt.total}</p>
        <p><strong>Time:</strong> {receipt.timestamp}</p>
        <p><strong>Message:</strong> {receipt.message}</p>

        <h3 className="mt-4">🛍️ Ordered Items:</h3>
        <ul>
          {receipt.items?.map((item, i) => (
            <li key={i}>
              {item.name} — ₹{item.price}
            </li>
          ))}
        </ul>

        <Link to="/" className="checkout-btn mt-4">
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}

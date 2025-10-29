import React from "react";

const Cart = ({ cart, setCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
  };

  return (
    <div className="app">
      <h1 className="title">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty 😔</p>
      ) : (
        <div className="product-grid">
          {cart.map((item, index) => (
            <div key={index} className="product-card">
              <img
                src={item.image || "https://via.placeholder.com/200"}
                alt={item.name}
              />
              <h3>{item.name}</h3>
              <p className="price">₹{item.price}</p>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <h2>Total: ₹{total}</h2>
    </div>
  );
};

export default Cart;

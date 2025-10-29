const express = require("express");
const router = express.Router();

// Mock product data
const products = [
  { _id: 1, name: "Wireless Headphones", price: 1999, category: "Audio" },
  { _id: 2, name: "Smart Watch", price: 2999, category: "Tech" },
  { _id: 3, name: "Bluetooth Speaker", price: 1499, category: "Audio" },
  { _id: 4, name: "Laptop Stand", price: 999, category: "Accessories" },
  { _id: 5, name: "Phone Tripod", price: 799, category: "Accessories" },
  { _id: 6, name: "USB Type-C Cable", price: 299, category: "Tech" },
];


// Get all products
router.get("/", (req, res) => {
  res.json(products);
});

// ✅ Checkout Route (this part is important!)
router.post("/checkout", (req, res) => {
  try {
    const { cartItems, name, email } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    res.json({
      success: true,
      message: "Checkout successful",
      receipt: {
        name,
        email,
        total,
        date: new Date().toLocaleString(),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Checkout failed", error: error.message });
  }
});

module.exports = router;

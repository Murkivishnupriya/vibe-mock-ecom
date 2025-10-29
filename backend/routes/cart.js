const express = require("express");
const router = express.Router();

let cart = [];

// ✅ Add to cart
router.post("/", (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || !qty) {
    return res.status(400).json({ message: "productId and qty are required" });
  }
  cart.push({ id: Date.now(), productId, qty });
  res.json({ message: "Added to cart", cart });
});

// ✅ Get all cart items + total
router.get("/", (req, res) => {
  let total = 0;
  cart.forEach((item) => {
    total += item.qty * 100; // sample price * qty
  });
  res.json({ cart, total });
});

// ✅ Delete cart item
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  cart = cart.filter((item) => item.id != id);
  res.json({ message: "Item removed", cart });
});

module.exports = router;

// POST /api/checkout → mock receipt
router.post("/checkout", (req, res) => {
  const { cartItems, name, email } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty!" });
  }

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const receipt = {
    name,
    email,
    total,
    timestamp: new Date().toLocaleString(),
    message: "✅ Checkout successful (mock receipt generated).",
  };

  res.json(receipt);
});

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const ORDERS_FILE = "./orders.json";

// ✅ Load existing orders from file
let orders = [];
if (fs.existsSync(ORDERS_FILE)) {
  orders = JSON.parse(fs.readFileSync(ORDERS_FILE));
}

// ✅ Product list (6 items with categories)
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1999,
    image: "/images/headphones.jpg",
    category: "Audio",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2999,
    image: "/images/watch.jpg",
    category: "Tech",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 1499,
    image: "/images/speaker.jpg",
    category: "Audio",
  },
  {
    id: 4,
    name: "Laptop Stand",
    price: 999,
    image: "/images/laptop.jpg",
    category: "Tech",
  },
  {
    id: 5,
    name: "Phone Tripod",
    price: 799,
    image: "/images/tripod.jpg",
    category: "Accessories",
  },
  {
    id: 6,
    name: "USB Type-C Cable",
    price: 299,
    image: "/images/cable.jpg",
    category: "Accessories",
  },
];


// ✅ Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// ✅ Checkout endpoint — saves order to orders.json
app.post("/api/checkout", (req, res) => {
  const { cartItems, name, email } = req.body;
  if (!cartItems || !name || !email) {
    return res.status(400).json({ message: "Invalid checkout data" });
  }

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const timestamp = new Date().toLocaleString("en-IN");

  const order = { name, email, items: cartItems, total, timestamp };
  orders.push(order);

  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));

  res.json({
    message: "✅ Order placed successfully!",
    name,
    email,
    total,
    timestamp,
  });
});

// ✅ Get all orders
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

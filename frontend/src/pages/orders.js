import React, { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setFilteredOrders(data);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const filterOrders = (type) => {
    setActiveTab(type);

    if (type === "recent") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const recent = orders.filter((order) => {
        if (!order.timestamp) return false;

        // 🧠 Convert date like "28/10/2025, 10:30:22 PM" to valid format
        const formattedDate = order.timestamp.replace(
          /(\d{1,2})\/(\d{1,2})\/(\d{4}),/,
          "$3-$2-$1,"
        );

        const orderDate = new Date(formattedDate);
        return orderDate >= sevenDaysAgo;
      });

      setFilteredOrders(recent);
    } else if (type === "highvalue") {
      setFilteredOrders(orders.filter((order) => order.total >= 1000));
    } else {
      setFilteredOrders(orders);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">🧾 Order History</h1>

      {/* Tabs */}
      <div className="tabs flex gap-4 mb-6">
        <button
          className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
          onClick={() => filterOrders("all")}
        >
          All Orders
        </button>
        <button
          className={`tab-btn ${activeTab === "recent" ? "active" : ""}`}
          onClick={() => filterOrders("recent")}
        >
          Recent (7 days)
        </button>
        <button
          className={`tab-btn ${activeTab === "highvalue" ? "active" : ""}`}
          onClick={() => filterOrders("highvalue")}
        >
          High Value (₹1000+)
        </button>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <p>No orders found 😅</p>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="order-card">
              <h2>Order ID: {order.id}</h2>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Date:</strong> {order.timestamp}</p>

              <h3 className="mt-3 font-medium">Items:</h3>
              <ul className="order-items">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} — ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

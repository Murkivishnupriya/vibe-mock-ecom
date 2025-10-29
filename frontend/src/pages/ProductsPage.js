import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch mock products from backend API
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
      {products.map((product) => (
        <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductsPage;

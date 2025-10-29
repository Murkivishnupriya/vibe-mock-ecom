Vibe Mock E-Commerce

A mock e-commerce web application built with React (frontend) and Node.js + Express (backend).
Users can explore products, add them to the cart, proceed to checkout, and view their order history — all stored locally through a simple backend.

Overview

This project simulates a basic shopping experience where users can:

Browse available products

Add or remove items from their cart

Checkout securely with their details

View their past order history
All interactions are persisted using a lightweight backend that saves data in orders.json.

Tech Stack
Frontend

React.js

React Router DOM

Axios

CSS (custom, responsive layout)

Backend

Node.js

Express.js

CORS

File System (for saving orders)

Features 

Product Listing

Displays all available products with names, prices, and images.

Option to add products to cart dynamically.

Cart Management

Add and remove items from cart.

Displays current cart count in the navbar.

Checkout System

Collects user details (name and email).

Saves order details including cart items, total price, and timestamp.

Displays an order success receipt on checkout.

Order History

Lists all previous orders saved in backend.

Highlights recent and high-value orders (above ₹1000).

Each order card displays items, price, and time of purchase.

User Interface

Clean and responsive layout.

Styled product grid, checkout, and order history cards.

Navbar links for navigation between pages.

Folder Structure
vibe-mock-ecom/
│
├── backend/
│   ├── routes/
│   │   ├── products.js
│   │   ├── cart.js
│   ├── server.js
│   ├── orders.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   ├── pages/
│   │   │   ├── Orders.js
│   │   ├── App.js
│   │   ├── App.css
│   ├── package.json
│
└── README.md 

Installation & Setup

Start Backend
cd backend
npm install
node server.js


Server runs at:
http://localhost:5000

Start Frontend
cd frontend
npm install
npm start


Frontend runs at:
http://localhost:3000 

API Endpoints
Method	Endpoint	    Description
GET	    /api/products	Fetch all available products
POST	/api/checkout	Checkout and save new order
GET	    /api/orders	    Fetch all saved orders


 Screenshots
 
### Home Page
![Home Page](./screenshots/home.png)

### Cart Page
![Cart Page](./screenshots/cart.png)

### Checkout successful Page
![Checkout Page](./screenshots/checkout.png)

### Orders Page
![Orders Page](./screenshots/orderhistory.png)


Watch the demo of **VibeMock Ecom** here
https://www.awesomescreenshot.com/video/45807494?key=f15c58bfdcfa8f2c1e0e0ec8e42866e9

Conclusion

This project demonstrates a complete end-to-end mock e-commerce flow — from browsing products to checkout and order tracking.
It highlights frontend-backend integration, API handling, and clean UI design suitable for beginner to intermediate-level full-stack development projects.

Developer

Vishnupriya Murki
GitHub : https://github.com/Murkivishnupriya
LinkedIn : https://www.linkedin.com/in/vishnupriyamurki 


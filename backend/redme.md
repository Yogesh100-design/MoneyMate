# 🛍️ E-Commerce API

A simple e-commerce backend built with **Node.js**, **Express.js**, and **MongoDB**, featuring user authentication, product management, and basic cart functionality.  
This project was built in 2 days to revise full-stack concepts.

---

## 🚀 Features
- **User Authentication** (JWT-based Login & Signup)
- **Product Management** (Add, View, Update, Delete)
- **Cart Management**
- **Secure Password Hashing** (bcrypt)
- **Environment Variables** with `.env`
- **MongoDB Connection** using Mongoose

---

## 📂 Project Structure


backend/
│
├── src/
│ ├── config/ # Database connection
│ ├── controllers/ # Business logic
│ ├── middleware/ # Auth middleware
│ ├── models/ # MongoDB models
│ ├── routes/ # API routes
│ └── server.js # App entry point
│
├── package.json
└── .env


---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT, bcrypt
- **Environment:** dotenv

---

## ⚙️ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/ecommerce-api.git
cd ecommerce-api/backend

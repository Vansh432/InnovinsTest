# 📝 Node.js Authentication & Products Management App

This project is a simple **Node.js + Express + MySQL** web application that demonstrates:

- User Authentication & Session Management
- Forgot Password (via static OTP)
- Role-Based Access Control
- CRUD Operations for Users and Products
- REST API endpoints for Products

---
## 🗄️ Database Setup

Run the following SQL queries to create the required tables:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price INT(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


## 🔐 Access Control
- Middleware protection for routes  
- Only **authenticated (logged-in)** users can access protected endpoints

---

## 👥 User Management
Provides full CRUD functionality for managing users:

- View all users
- Add a new user
- Edit an existing user
- Delete a user

---

**Base URL:** `/api/users`

| Method | Endpoint   | Description                     |
|--------|-------------|---------------------------------|
| GET    | `/all`         | Get all users                |
| GET    | `/:id`       | Get a single users by ID       |
| POST   | `/register`         | Create a new users             |
| PUT    | `/:id`       | Update an existing users       |
| DELETE | `/:id`       | Delete a users                  |
| POST | `/login`       | Login a users                  |
| POST | `/forget_password`       | forget_password a password                  |

## 📦 Product Management
Provides full CRUD functionality for managing products:

- View all products
- Add a new product
- Edit an existing product
- Delete a product

---

## 📡 Products REST API

**Base URL:** `/api/user/products`

| Method | Endpoint   | Description                     |
|--------|-------------|---------------------------------|
| GET    | `/all`         | Get all products                |
| GET    | `/:id`       | Get a single product by ID       |
| POST   | `/`         | Create a new product             |
| PUT    | `/:id`       | Update an existing product       |
| DELETE | `/:id`       | Delete a product                  |


## ⚙️ Setup & Run

### 1. Install Dependencies
Run the following command to install all required Node modules:

```bash
npm install

### 2. run server
```bash
npm run start
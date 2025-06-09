# 📚 Bookmark Project

A simple REST API built to practice using **MongoDB** with **Node.js**, **Express**, **TypeScript**, and **Mongoose**.

This project includes user authentication, bookmark management, whitelist functionality, and search/filter features.

---

## 🛠️ Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose

---

## 🔐 Core Features

- ✅ User authentication (login/register)
- ✅ JWT token stored in cookies
- ✅ Middleware to validate tokens
- ✅ CRUD operations for bookmarks
- ✅ Add/remove bookmarks to a whitelist
- ✅ Search bookmarks by title or tags (array support)

---

## 🔗 API Endpoints
Postman Doc : https://documenter.getpostman.com/view/37893632/2sB2x3oDep

### 🔐 Auth

- `POST /auth/register` – Register a new user  
- `POST /auth/login` – Log in and receive JWT (stored in cookie)  
- `GET /auth/me` – Get current logged-in user info  

### 🔖 Bookmarks

- `POST /bookmark/create` – Create a new bookmark  
- `GET /bookmark/public` – Get all public bookmarks  
- `GET /bookmark/public/:id` – Get a specific public bookmark  
- `GET /bookmark/me` – Get all my bookmarks  
- `GET /bookmark/me/:id` – Get my specific bookmark  
- `PATCH /bookmark/:id` – Update a bookmark  
- `DELETE /bookmark/:id` – Delete my bookmark  

### 🤍 Whitelist

- `GET /whitelist` – List my whitelist bookmarks  
- `POST /whitelist` – Add a bookmark to my whitelist  
- `DELETE /whitelist` – Remove a bookmark from my whitelist  

---

## 📌 Notes

- Authentication required for all `/bookmark/*` and `/whitelist` endpoints.
- Only owners can update/delete their own bookmarks.
- Public bookmarks are visible to everyone without login.

---

## 🧪 Status

This project is for learning purposes and is actively being improved.

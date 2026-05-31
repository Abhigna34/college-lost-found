# 🎒 Lost & Found Portal

A full-stack MERN application that helps users report, search, and manage lost and found items within an organization or campus.

![React](https://img.shields.io/badge/React-Frontend-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)

---

## ✨ Features

### User Features

- User Registration
- User Login with JWT Authentication
- Post Lost Items
- Post Found Items
- Upload Item Images
- View All Lost & Found Items
- View Detailed Item Information
- Personal Dashboard for Managing Posted Items
- Delete Own Posted Items

### Admin Features

- Admin Login
- View All Registered Users
- View All Posted Items
- Delete Any Item
- Monitor Lost & Found Activity

### Item Management

- Item Title
- Description
- Category
- Location
- Status (Lost / Found)
- Image Upload Support

---

## 🛠️ Technology Stack

| Layer          | Technology                    |
| -------------- | ----------------------------- |
| Frontend       | React.js, Tailwind CSS, Axios |
| Backend        | Node.js, Express.js           |
| Database       | MongoDB, Mongoose             |
| Authentication | JWT (JSON Web Token)          |
| File Upload    | Multer                        |
| UI Icons       | Lucide React                  |
| ML Integration | TensorFlow.js, MobileNet      |

---

## 📁 Project Structure

```text
Lost-And-Found-Portal/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── PostItem.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ItemDetails.jsx
│   │   │   └── AdminDashboard.jsx
│   │   │
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   │
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Item.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── itemRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── uploads/
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB
- npm

---

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/lost-found-portal.git

cd lost-found-portal
```

---

## 2️⃣ Backend Setup

```bash
cd server

npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Start Server

```bash
npm start
```

Backend runs on:

```text
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

```bash
cd client

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

---

### Items

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | /api/items          |
| POST   | /api/items          |
| GET    | /api/items/:id      |
| DELETE | /api/items/:id      |
| GET    | /api/items/my-items |

---

### Admin

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | /api/admin/users |
| GET    | /api/admin/items |

---

## 📸 Application Workflow

### User Registration

1. User creates account
2. Data stored in MongoDB
3. User redirected to Login

### User Login

1. Credentials verified
2. JWT token generated
3. Token stored in localStorage

### Posting an Item

1. User fills item form
2. Uploads image
3. Item saved to database
4. Visible on Home page

### Dashboard

1. User views posted items
2. Delete unwanted items
3. Track Lost & Found reports

### Admin Dashboard

1. View all users
2. View all items
3. Delete inappropriate posts

---

## 🔒 Security Features

- JWT Authentication
- Protected Routes
- Password Hashing
- Role-Based Access Control
- Admin Authorization
- Secure API Requests

---

## 🎨 UI Features

- Modern Dark Theme
- Responsive Design
- Dashboard Statistics
- Glassmorphism Cards
- Lucide Icons
- Interactive Item Cards
- Mobile Friendly Layout

---

## 📈 Future Enhancements

- AI-based Item Matching
- Email Notifications
- Real-time Chat
- Claim Verification System
- Location Tracking
- Advanced Search Filters
- Item Recovery Analytics

---

## 👩‍💻 Author

### Abhigna Bandi

B.Tech Student

Lost & Found Portal – MERN Stack Project

---

## ⭐ Project Goal

To provide a centralized platform where users can efficiently report, search, and recover lost items while administrators manage and monitor all platform activities.

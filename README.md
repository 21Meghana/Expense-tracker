# 💰 Expense Tracker (Full Stack)

A minimal full-stack Expense Tracker application that allows users to add, view, filter, and analyze personal expenses.

---

## 🚀 Live Demo

Frontend: https://expense-tracker-lbz8.vercel.app
Backend: https://expense-backend-723e.onrender.com

---

## 📌 Features

* Add new expense (amount, category, description, date)
* View all expenses
* Filter expenses by category (search-based)
* Sort expenses by date (newest / oldest)
* View total expense of current list
* Category-wise summary (total per category)
* Clean and responsive UI
* Handles refresh and repeated actions correctly

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* Mongoose

---

## 📂 Project Structure

expense-tracker/
│
├── backend/
│   ├── models/
│   ├── server.js
│   ├── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
└── README.md

---

## ⚙️ Setup Instructions

### 1️⃣ Clone repository

git clone https://github.com/21Meghana/Expense-tracker.git
cd expense-tracker

---

### 2️⃣ Backend Setup

cd backend
npm install

Create `.env` file:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Run backend:
node server.js

---

### 3️⃣ Frontend Setup

cd frontend
npm install
npm start

---

## 🌐 API Endpoints

### ➤ Add Expense

POST /expenses

### ➤ Get Expenses

GET /expenses?category=&sort=date_desc

---

## 🧠 Key Design Decisions

* Used MongoDB Atlas for cloud-based storage
* Frontend filtering for better user experience
* Backend handles sorting and validation
* Simple and maintainable architecture

---

## ⚖️ Trade-offs

* No authentication (kept simple)
* No pagination
* Limited predefined categories

---

## 🔒 Edge Cases Handled

* Prevent invalid amounts
* Handle empty inputs
* Works after page refresh
* Handles repeated submissions

---

## 🚀 Future Improvements

* Add authentication (login/signup)
* Add charts/analytics
* Add pagination
* Improve UI/UX
* Add edit/delete expense

---

## 👩‍💻 Author

Meghana Khotare

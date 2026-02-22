# 🍽 GOERS Restaurant App (React + Laravel)

A fullstack restaurant management application built with **React (frontend)** and **Laravel (backend API)**.

This project was developed as a technical test submission.

---

# 🚀 Features

## Public User

* View restaurant list
* Filter restaurants by name, day, and time

## Admin

* Login with predefined admin credentials
* Add new restaurant
* Delete restaurant
* Protected routes for admin-only actions

---

# 🔐 Admin Login

This project uses a **simple hardcoded admin authentication** as required by the test.

```
email: admin@goers.com
password: helloworld
```

(Replace with your actual credentials if different)

---

# 🏗 Project Structure

```
frontend/   → React + Vite + TypeScript
backend/    → Laravel API + Sanctum auth
```

---

# ⚙️ Backend Setup (Laravel)

## 1. Go to backend folder

```
cd backend
```

## 2. Install dependencies

```
composer install
```

## 3. Configure database in `.env`

Fill the BD_CONNECTION with 'sqlite' and DB_DATABASE with 'database/database.sqlite':

```
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

---

## 4. Run migrations

```
php artisan migrate
```

---

## 5. Start Laravel server

```
php artisan serve
```

Backend will run at:

```
http://127.0.0.1:8000
```

---

# 🎨 Frontend Setup (React)

## 1. Go to frontend folder

```
cd frontend
```

## 2. Install dependencies

```
npm install
```

---

## 3. Create `.env`
The .env is purposedly to be committed in this project to make the testing process easier. In production environment, this would not be happening.

```
VITE_API_URL=http://127.0.0.1:8000/api
```

---

## 4. Start frontend

```
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

# 🔐 Authentication Flow

* Login returns Laravel Sanctum token
* Token stored in localStorage
* Axios interceptor automatically attaches Bearer token
* Protected routes restrict admin-only pages
* Public users can still browse restaurants

---

# 🧰 Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Axios
* TailwindCSS

### Backend

* Laravel
* Laravel Sanctum
* MySQL (using SQLite)

---

# 🧩 ERD (Entity Relationship Diagram)

USERS
-----
* id (PK)
* name
* email
* password
* created_at
* updated_at


RESTAURANTS
-----------
* id (PK)
* name
* created_at
* updated_at


RESTAURANT_HOURS
----------------
* id (PK)
* restaurant_id (FK → restaurants.id)
* day_of_week
* open_time
* close_time
* created_at
* updated_at


RELATIONSHIPS
-------------
restaurants 1 ────< restaurant_hours

---

# 📝 Notes (Assumptions and Limitations)

* Authentication is intentionally simplified (hardcoded admin)
* Registration is not required for this project
* Focus is on API integration and role-based UI behavior

---

# 👨‍💻 Author
Muhammad Iqbal

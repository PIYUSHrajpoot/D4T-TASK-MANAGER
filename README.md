# 🚀 D4T - Task Management System

## 📋 Project Overview

This project is a SIMPLE **Task Management System** designed with a **frontend** built in **Angular** and a **backend** using **NestJS**. The application allows users to manage tasks effectively with a responsive interface, authentication, and CRUD operations.

---

## 👀 APRESENTAÇÃO EM VÍDEO
📌[Portuguese Version](https://youtu.be/PYJ2_EupL84)

---
## 🌐 Frontend

- **Responsive components** using Angular Material.
- **Authentication and authorization** with JWT tokens.

### 🔧 Features
- **Simple Login & Registration** with input validation.
- **JWT Storage** in localStorage.
- **Task Management**:
  - View, create, edit, delete tasks.
  - Mark tasks as complete.
  - Route Guards for protected routes.
  - Pagination and filtering.
  - Toasts or snackbars from material and sweetAlert2.

### 🛠️ Setup Instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   ng serve
   ```
3. Access the application at:
   ```bash
   http://localhost:4200
   ```

---

## 🖥️ Backend

### 📜 Technologies:
1. **Framework:** NestJS.
2. **Database:** MySQL.
3. **ORM:** TypeORM.

### 🔧 Features
  - Simple User Login with JWT, Registration.
  - CRUD ENDPOINTS.
  - Pagination.

### 🛠️ Setup Instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create the database schema:
   ```bash
   npx typeorm migration:run
   ```
3. Start the server:
   ```bash
   npm run start:dev
   ```
4. Access the API at:
   ```bash
   http://localhost:3000
   ```
5. Access Swagger documentation at:
   ```bash
   http://localhost:3000/api
   ```

---

## 🔗 API Endpoints

### 🔐 Authentication
- **POST** `/auth/register` - Register new user.
- **POST** `/auth/login` - Login and generate JWT.

### ✅ Tasks
- **GET** `/tasks` - Get all tasks (paginated).
- **POST** `/tasks` - Create a new task.
- **PUT** `/tasks/:id` - Edit a task.
- **DELETE** `/tasks/:id` - Delete a task.
- **PATCH** `/tasks/:id/complete` - Mark a task as complete.

> **Note:** All task endpoints require authentication via Bearer token.

---

## 📖 Additional Notes
- Ensure **MySQL** is running with the specified credentials.
- Swagger documentation provides detailed API specs.
- The system has a simple aesthetic, using the Inline Template approach in components to keep it lightweight and easy to test.

---

## 🧑‍💻 Development Tools
- **Frontend:** Angular, Angular Material.
- **Backend:** NestJS, TypeORM.
- **Database:** MySQL.
- **Authentication:** JWT.
- **Documentation:** Swagger.

---

## 📞 Support
For any issues, please open an issue on the repository or contact me via email: tierickrosa@gmail.com!

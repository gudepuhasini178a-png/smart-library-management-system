# Smart Library Management System

## 📚 Project Overview

Smart Library Management System is a web-based library management application designed to make library activities simple, organized and easy to manage.

The system provides separate login access for three types of users:

- Administrator
- Librarian
- Student

Each user has different access permissions according to their role.

## 🎯 Project Objective

The main objective of this project is to provide a user-friendly digital system for managing library activities such as books, students, issue and return, reservations, fines and notifications.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript

## 👥 User Roles

### 👑 Administrator

Admin has full access to the system.

Admin can access:

- Dashboard
- Book Management
- Student Management
- Issue & Return
- Reservations
- Fine Management
- Notifications
- Reports
- Settings

### 📚 Librarian

Librarian manages daily library operations.

Librarian can access:

- Dashboard
- Book Management
- Student Management
- Issue & Return
- Reservations
- Fine Management
- Notifications
- Reports

### 🎓 Student

Student has limited access to student-related features.

Student can access:

- Dashboard
- Books
- Reservations
- Notifications

## 🔐 Demo Login Credentials

### Administrator
Username: `admin`  
Password: `admin123`

### Librarian
Username: `librarian`  
Password: `lib123`

### Student
Username: `student`  
Password: `stu123`

## 📊 Role-Based Access

| Feature | Admin | Librarian | Student |
|---|---|---|---|
| Dashboard | ✅ | ✅ | ✅ |
| Books | ✅ | ✅ | ✅ |
| Students | ✅ | ✅ | ❌ |
| Issue & Return | ✅ | ✅ | ❌ |
| Reservations | ✅ | ✅ | ✅ |
| Fines | ✅ | ✅ | ❌ |
| Notifications | ✅ | ✅ | ✅ |
| Reports | ✅ | ✅ | ❌ |
| Settings | ✅ | ❌ | ❌ |

## 🌟 Main Features

- Separate Admin, Librarian and Student login
- Role-based access control
- Book Management
- Student Management
- Issue and Return
- Book Reservations
- Fine Management
- Notifications
- Reports
- Settings
- Responsive user interface

## 🚀 How to Run

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in a web browser.
4. Select the required role.
5. Enter the username and password.
6. Click the Login button.
7. Features will be displayed according to the selected role.

## 📂 Project Structure

```text
SMART-LIBRARY/
│
├── index.html
├── style.css
├── script.js
└── README.md

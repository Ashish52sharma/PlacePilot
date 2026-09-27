# PlacePilot – Placement Tracker

PlacePilot is a full-stack web application designed to help students organize and track their placement journey in one place.

## 🚀 Live Demo

https://placepilot-ashish.netlify.app/

## 💻 GitHub Repository

https://github.com/Ashish52sharma/PlacePilot

## ✨ Features

* User Registration and Login
* Placement Application Tracking
* Add, Update and Delete Applications
* Search and Filter Applications
* Preparation Topic Tracker
* Interview Round Management
* Interview Status and Notes
* Cloud Database Storage
* Responsive and Simple User Interface

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js
* REST API
* bcrypt

### Database

* MySQL
* Aiven Cloud

### Deployment

* Netlify – Frontend
* Render – Backend
* Aiven – Database

## 📂 Project Structure

```text
PlacePilot/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 🔐 Authentication

PlacePilot provides user registration and login functionality. Passwords are securely hashed using bcrypt before being stored in the database.

## 🗄️ Database

The application uses MySQL with the following main tables:

* `users`
* `applications`
* `preparation`
* `interviews`

The database is hosted on Aiven Cloud.

## 🌐 Deployment Architecture

```text
React Frontend
      ↓
   Netlify
      ↓
Node.js + Express Backend
      ↓
    Render
      ↓
   MySQL Database
      ↓
  Aiven Cloud
```

## 🎯 Purpose

PlacePilot was developed as a practical full-stack project to manage placement applications, preparation progress, and interview details through a single web application.

## 👨‍💻 Author

Ashish Kumar Sharma

B.Tech – Computer Science and Engineering

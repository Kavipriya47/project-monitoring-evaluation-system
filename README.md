
---

```md
# 📘 Project Monitoring & Evaluation System (PMES)

A full-stack MERN web application that enables students to submit academic projects, track progress stage-wise, and allows faculty to evaluate, mark, finalize, and lock projects after review.

Built using **MongoDB, Express, React, and Node.js (MERN Stack)**.

---

## 🚀 Project Goal

To provide a centralized platform for:

- Student project submission  
- Stage-wise project progress tracking  
- Faculty evaluation and final approval  
- Automatic project locking after final review  

---

## 🧱 Tech Stack

### Frontend
- React.js  
- Axios  
- React Router DOM  
- Tailwind CSS  
- Context API (Authentication)  
- Hosted on Render  

### Backend
- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  
- JWT Authentication  
- Hosted on Render  

---

## 📁 Project Structure

```

PMES
│
├── backend
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   └── facultyController.js
│   │
│   ├── models
│   │   ├── User.js
│   │   └── Project.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   └── facultyRoutes.js
│   │
│   ├── server.js
│   └── .env
│
├── frontend
│   ├── public
│   │
│   └── src
│       ├── assets
│       │
│       ├── components
│       │   ├── common
│       │   └── layout
│       │       ├── Layout.jsx
│       │       ├── Navbar.jsx
│       │       └── Sidebar.jsx
│       │
│       ├── pages
│       │   ├── auth
│       │   │
│       │   ├── student
│       │   │   ├── StudentDashboard.jsx
│       │   │   ├── SubmitProject.jsx
│       │   │   └── ViewStatus.jsx
│       │   │
│       │   └── faculty
│       │       └── FacultyDashboard.jsx
│       │
│       ├── routes
│       │   └── AppRoutes.jsx
│       │
│       ├── App.js
│       └── index.js
│
└── README.md

````

---

## 👩‍🎓 Student Features

### ✅ Authentication
- Student registration and login  
- Role-based access (Student / Faculty)  

### ✅ Submit Project
- Students can submit multiple projects  
- Duplicate project titles are restricted per student  
- Each project includes:
  - Roll Number  
  - Department  
  - Project Title  
  - Description  
  - Current Stage  

### ✅ Project Dashboard
- View all submitted projects  
- Live progress bar display  
- Stage selection dropdown  
- Stage update disabled after project finalization  

### 📊 Project Stages & Progress Mapping

| Stage        | Progress |
|--------------|----------|
| Designing    | 10%      |
| Database     | 30%      |
| Frontend     | 50%      |
| Backend      | 70%      |
| Deployment   | 100%     |

### ✅ Project Status Page
- Displays:
  - Stage  
  - Progress  
  - Status  
  - Marks  
  - Faculty Remarks  
- Finalized projects are locked and cannot be edited  

---

## 👨‍🏫 Faculty Features

### ✅ Faculty Dashboard
- View all student projects  
- Access student and project details  
- Automatic progress tracking  

### ✅ Final Evaluation
- Marks input enabled only at 100% progress  
- Faculty can:
  - Add marks  
  - Add remarks  
  - Finalize project  

### 🔒 After Finalization
- Project becomes locked  
- Student cannot update project stage  
- Project status updates to **Completed**  

---

## 🔐 Core Logic Implemented

- Project locking after final review  
- Automatic progress percentage calculation  
- Duplicate project title prevention  
- Real-time UI updates after actions  
- Role-based routing and access control  
- Clean separation of routes and controllers  

---

## 🌐 API Endpoints

### Student Routes
- `POST   /api/student/submit`  
- `GET    /api/student/my/:email`  
- `PUT    /api/student/update/:id`  

### Faculty Routes
- `GET    /api/faculty/projects`  
- `PUT    /api/faculty/review/:id`  

### Authentication Routes
- `POST   /api/auth/register`  
- `POST   /api/auth/login`  

---

## 🗃️ Database Schema (Project)

```js
{
  studentName: String,
  studentEmail: String,
  title: String,
  description: String,
  stage: String,
  progress: Number,
  status: String,
  marks: Number,
  remarks: String,
  locked: Boolean
}
````

---

## ☁️ Deployment (Render)

### Backend

* Node environment
* MongoDB Atlas connection
* Environment Variables:

  * `MONGO_URI`
  * `JWT_SECRET`

### Frontend

* Build Command:

  ```
  npm run build
  ```
* Publish Directory:

  ```
  frontend/build
  ```
* Axios configured with deployed backend URL

---

## 🧪 Local Setup

### Backend

```bash
cd backend
npm install
nodemon server.js
```

### Frontend

```bash
cd frontend
npm install
npm start
```

* Frontend: `http://localhost:3000`
* Backend: `http://localhost:4000`

---

```

---

"# project-monitoring-evaluation-system" 

# 🩺 Digital Health Wallet

A full-stack **Digital Health Wallet** application that allows users to securely upload medical reports, track vitals over time, retrieve reports using filters, and share selected reports with doctors or family members with **read-only access**.

This project is developed as part of the **2care.ai Full Stack Internship Assignment**.

---

## 🚀 Features

- User Registration & Login (JWT Authentication)
- Upload medical reports (PDF / Image)
- Store report metadata (type, date, vitals)
- Track vitals over time (BP, Sugar, Heart Rate)
- Dashboard with animated charts
- Search & filter reports by type and date
- Share reports with doctors / family (read-only)
- Popup notifications for all actions
- Clean, consistent UI

---

## 🛠️ Tech Stack

### Frontend
- ReactJS
- React Router
- Chart.js
- Custom CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- Multer (file uploads)

### Database
- SQLite

---

## 📂 Project Structure

```
digital-health-wallet/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── reports.js
│   │   ├── vitals.js
│   │   └── share.js
│   └── uploads/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── public/
│
└── README.md
```

---

## 🎯 Functional Requirements Covered

### User Management
- Register & Login
- JWT-based authentication
- Owner / Viewer role logic

### Health Reports
- Upload medical reports
- Store metadata (type, date, vitals)
- View & download reports

### Vitals Tracking
- Store vitals over time
- Visualize trends using charts

### Report Retrieval
- Search by report type
- Filter by date

### Access Control
- Share selected reports
- Read-only access for shared users

---

## 🧱 System Architecture

### Frontend (ReactJS)
- Component-based UI
- State handled using React hooks
- Axios for API integration

### Backend (Node.js + Express)
- REST APIs
- JWT authentication middleware
- Business logic in route handlers

### Database (SQLite)
- Lightweight relational database
- Stores users, reports, vitals, and shared access

---

## 🗄️ Database Schema (Simplified)

### Users
| Field | Type |
|------|------|
| id | INTEGER |
| name | TEXT |
| email | TEXT |
| password | TEXT |

### Reports
| Field | Type |
|------|------|
| id | INTEGER |
| user_id | INTEGER |
| type | TEXT |
| date | TEXT |
| vitals | TEXT |
| file_path | TEXT |

### Vitals
| Field | Type |
|------|------|
| id | INTEGER |
| user_id | INTEGER |
| bp | TEXT |
| sugar | TEXT |
| heart_rate | TEXT |
| date | TEXT |

### Shared_Reports
| Field | Type |
|------|------|
| id | INTEGER |
| report_id | INTEGER |
| email | TEXT |
| access | TEXT (read-only) |

---

## 📐 Architecture Diagram (Textual)

```
[ ReactJS Client ]
        |
        | REST API (JWT)
        v
[ Node.js / Express Server ]
        |
        | SQL Queries
        v
[ SQLite Database ]

File Storage:
- Medical reports stored locally in /uploads
```

---

## 🔐 Security Considerations

- Passwords hashed before storage
- JWT-based authentication
- Protected API routes
- User-specific data access
- Read-only access for shared users
- File upload validation

---

## 📦 File Storage Strategy

- Files stored locally in `/uploads`
- File paths saved in database
- Can be migrated to cloud storage (S3 / GCS)

---

## 📈 Scalability (Bonus)

- Stateless backend (JWT)
- Modular REST APIs
- SQLite → PostgreSQL/MySQL migration possible
- Frontend deployable on CDN

---

## ▶️ How to Run Locally

### Backend

```bash
cd backend
npm install
node server.js
```

Backend runs on:
```
http://localhost:5000
```

---

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on:
```
http://localhost:3000
```

---

## 📡 API Endpoints

### Authentication
- POST `/auth/register`
- POST `/auth/login`

### Reports
- POST `/reports`
- GET `/reports`
- GET `/reports/filter`

### Vitals
- POST `/vitals`
- GET `/vitals`

### Share
- POST `/share`

(All protected routes require JWT token in headers)

---

## 🎥 Screen Recording

The screen recording includes:
- App walkthrough
- Feature demonstration
- Code structure overview
- Local setup

📎 Recording Link: *(Add here)*

---

## 🔗 GitHub Repository

Public Repository Link: *(Add here)*

---

## 👨‍💻 Author

**Raunak**  
Full Stack Developer  
Submission for **2care.ai Internship Assignment**

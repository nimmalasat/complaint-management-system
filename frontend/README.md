# Complaint Management System - React Dashboard

A modern, responsive admin and user dashboard built with **React**, **TypeScript**, and **Tailwind CSS** for managing complaints.

## 🎯 Features

✅ **User Authentication** - Login and register with JWT tokens  
✅ **User Dashboard** - Submit complaints and track their status  
✅ **Admin Dashboard** - Manage all complaints, update status, delete  
✅ **Real-time Updates** - Complaints update instantly  
✅ **Role-Based Access** - Different views for USER and ADMIN  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Modern UI** - Built with Tailwind CSS for beautiful design  

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Routing:** React Router v6
- **Build Tool:** Vite
- **HTTP Client:** Fetch API
- **Icons:** Lucide React

## 📋 Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Complaint Management Spring Boot API running on `http://localhost:8080`

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The dashboard will be available at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── pages/
│   ├── Login.tsx              # Login page
│   ├── Register.tsx           # Registration page
│   ├── UserDashboard.tsx      # User complaint dashboard
│   └── AdminDashboard.tsx     # Admin management dashboard
├── components/
│   └── ProtectedRoute.tsx     # Route protection wrapper
├── store/
│   ├── authStore.ts           # Authentication state (Zustand)
│   └── complaintStore.ts      # Complaints state (Zustand)
├── App.tsx                    # Main app with routing
├── main.tsx                   # Entry point
└── index.css                  # Global styles with Tailwind
```

## 🔐 Authentication

### Login Credentials (Demo)

After registering a user through the app:

```
Email: user@example.com
Password: password123
```

For admin access, use the Spring Boot API to set a user's role to ADMIN.

### JWT Token Storage

Tokens are stored in `localStorage` and automatically sent with every API request via the `Authorization: Bearer <token>` header.

## 📱 User Dashboard

Users can:
- View their submitted complaints
- Submit new complaints with category and description
- Track complaint status in real-time
- See complaint submission date and time

## 👨‍💼 Admin Dashboard

Admins can:
- View all user complaints
- See complaint statistics (Total, Pending, In Progress, Resolved)
- Update complaint status (Pending → In Progress → Resolved/Rejected)
- Delete complaints
- Manage all users' complaints

## 🔌 API Integration

The dashboard connects to the Spring Boot backend API:

**Base URL:** `http://localhost:8080/api`

### Endpoints Used:

```
POST   /auth/register          # User registration
POST   /auth/login             # User login
POST   /complaints             # Submit complaint (User)
GET    /complaints/my          # Get user's complaints
GET    /admin/complaints       # Get all complaints (Admin)
PUT    /admin/complaints/{id}/status  # Update complaint status (Admin)
DELETE /admin/complaints/{id}  # Delete complaint (Admin)
```

## 🎨 Styling & Components

The dashboard uses **Tailwind CSS** with custom color scheme:

- **Primary:** Blue (#3B82F6)
- **Secondary:** Green (#10B981)
- **Danger:** Red (#EF4444)
- **Warning:** Yellow (#F59E0B)

### Component Examples:

- Responsive header with logout
- Form validation with error messages
- Status badges with color coding
- Responsive tables for admin view
- Modal-like form overlays

## 🚨 Error Handling

- Network errors are caught and displayed to users
- Invalid credentials show clear error messages
- Protected routes redirect unauthenticated users to login
- Role-based route protection ensures admins can only access admin features

## 📦 Deployment

### Deploy to Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload the 'dist' folder to Netlify
```

### Deploy to GitHub Pages

```bash
npm install gh-pages --save-dev
# Add to package.json:
# "homepage": "https://yourusername.github.io/complaint-dashboard"
# "deploy": "npm run build && gh-pages -d dist"
npm run deploy
```

## 🔄 Environment Variables

Create `.env` file (optional, for custom API URL):

```env
VITE_API_URL=http://localhost:8080/api
```

Update `src/store/authStore.ts` and `src/store/complaintStore.ts` to use:

```typescript
const API_URL = import.meta.env.VITE_API_URL || '/api';
```

## 🐛 Troubleshooting

### CORS Issues

If you see CORS errors, ensure your Spring Boot backend has CORS enabled. Update Spring Security config:

```java
.authorizeHttpRequests(auth -> auth
  .requestMatchers("/api/auth/**").permitAll()
  // ... rest of config
)
```

### API Not Connecting

1. Check Spring Boot is running on `http://localhost:8080`
2. Verify `vite.config.ts` proxy is set correctly
3. Check browser console for network errors

### Authentication Issues

1. Clear localStorage: `localStorage.clear()` in browser console
2. Reload the page
3. Try registering a new account

## 👤 Author

**Naveen Satvik N**  
CS Undergrad @ SJCIT (graduating 2027)  
Backend & Full-Stack Engineer  

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- **Backend Repo:** https://github.com/nimmalasat/complaint-management-springboot
- **GitHub:** https://github.com/nimmalasat
- **LinkedIn:** https://linkedin.com/in/naveensatvik

---

**Happy coding! 🚀**

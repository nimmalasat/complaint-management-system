# Complaint Management System - Comprehensive Project Analysis

## 📋 Executive Summary

A **full-stack complaint management platform** built with **Spring Boot** (Java) backend and **React** (TypeScript) frontend. This is a production-quality REST API demonstrating modern software architecture, secure authentication, role-based access control, and responsive UI design.

---

## 🎯 Project Highlights

### **What Problem Does It Solve?**
Provides organizations with a centralized system for users to submit complaints and for administrators to manage, track, and resolve them efficiently. Replaces manual tracking with an automated, digital workflow.

### **Who Would Use This?**
- **Organizations** needing complaint management (schools, hospitals, municipalities, corporations)
- **Users** who need to submit and track complaints
- **Administrators** who need to manage and resolve complaints

### **Project Scope**
- ✅ User authentication & authorization
- ✅ Role-based access control (USER / ADMIN)
- ✅ Complaint lifecycle management (PENDING → IN_PROGRESS → RESOLVED/REJECTED)
- ✅ Real-time dashboard updates
- ✅ API documentation (Swagger/OpenAPI)
- ✅ Responsive UI for desktop & mobile
- ✅ Production-ready error handling

---

## 🛠️ Technical Architecture

### **Backend Stack**
| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | Spring Boot | 3.2.5 |
| **Language** | Java | 17 |
| **Database** | MySQL | 8.0+ |
| **ORM** | Spring Data JPA / Hibernate | - |
| **Security** | Spring Security + JWT | JJWT 0.11.5 |
| **API Docs** | Swagger / OpenAPI 3 | SpringDoc 2.5.0 |
| **Build Tool** | Maven | 3.8+ |
| **Utilities** | Lombok | Latest |

**Database Schema:**
```
users
├── id (PK)
├── name
├── email (UNIQUE)
├── password (BCrypt encrypted)
├── role (ENUM: USER, ADMIN)
└── complaints (FK relationship)

complaints
├── id (PK)
├── category
├── description
├── status (ENUM: PENDING, IN_PROGRESS, RESOLVED, REJECTED)
├── createdAt (auto-timestamp)
└── user_id (FK)
```

### **Frontend Stack**
| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | React | 18.2.0 |
| **Language** | TypeScript | 5.3.0 |
| **Build Tool** | Vite | 8.1.5 |
| **State Mgmt** | Zustand | 4.4.0 |
| **Routing** | React Router | 6.20.0 |
| **Styling** | Tailwind CSS | 3.4.0 |
| **HTTP Client** | Fetch API | Native |
| **Icons** | Lucide React | 0.292.0 |

---

## 📂 Project Structure

### **Backend Directory Tree**
```
backend/
├── pom.xml                           # Maven configuration
├── src/main/java/com/naveen/complaint/
│   ├── ComplaintApiApplication.java  # Spring Boot entry point
│   ├── controller/
│   │   ├── AuthController.java       # Auth endpoints (register/login)
│   │   ├── ComplaintController.java  # User complaint endpoints
│   │   └── AdminController.java      # Admin-only endpoints
│   ├── service/
│   │   ├── AuthService.java          # Auth logic + JWT generation
│   │   └── ComplaintService.java     # Complaint CRUD operations
│   ├── repository/
│   │   ├── UserRepository.java       # User JPA repository
│   │   └── ComplaintRepository.java  # Complaint JPA repository
│   ├── model/
│   │   ├── User.java                 # User entity with @Entity
│   │   └── Complaint.java            # Complaint entity with @Entity
│   ├── dto/
│   │   ├── AuthDTO.java              # Request/Response DTOs
│   │   └── ComplaintDTO.java         # Complaint DTOs
│   ├── security/
│   │   ├── JwtUtil.java              # JWT token generation/validation
│   │   └── JwtAuthFilter.java        # Servlet filter for JWT auth
│   ├── config/
│   │   ├── SecurityConfig.java       # Spring Security configuration
│   │   └── SwaggerConfig.java        # Swagger/OpenAPI setup
│   └── exception/
│       └── GlobalExceptionHandler.java # Centralized error handling
├── src/main/resources/
│   └── application.properties         # MySQL, JWT, Swagger config
└── target/                           # Compiled classes (build output)
```

### **Frontend Directory Tree**
```
frontend/
├── package.json                      # NPM dependencies
├── vite.config.ts                    # Vite build config + API proxy
├── tsconfig.json                     # TypeScript config
├── src/
│   ├── main.tsx                      # React app entry point
│   ├── App.tsx                       # Main routing component
│   ├── index.css                     # Tailwind CSS setup
│   ├── pages/
│   │   ├── Login.tsx                 # Login page (public)
│   │   ├── Register.tsx              # Registration page (public)
│   │   ├── UserDashboard.tsx         # User dashboard (protected)
│   │   └── AdminDashboard.tsx        # Admin panel (protected, ADMIN role)
│   ├── store/
│   │   ├── authStore.ts              # Zustand auth store (login/logout)
│   │   └── complaintStore.ts         # Zustand complaint store (CRUD)
│   └── components/
│       └── ProtectedRoute.tsx        # Route wrapper for auth guard
└── dist/                             # Build output
```

---

## 🔐 Security Implementation

### **Authentication Flow**
1. **User Registration**: Password hashed with BCrypt (12 rounds)
2. **User Login**: Email + password validated; JWT token issued
3. **JWT Payload**: Contains user email, issued time, expiration (24 hours)
4. **Token Validation**: Every request validated in `JwtAuthFilter`
5. **Role-Based Access**: `@PreAuthorize` annotation enforces ADMIN-only endpoints

### **Security Features**
- ✅ **JWT Stateless Auth**: No sessions; each request is independent
- ✅ **BCrypt Password Hashing**: Industry-standard encryption
- ✅ **CORS Support**: Configured for frontend on `localhost:3000`
- ✅ **CSRF Disabled**: Disabled for stateless JWT auth (CSRF not applicable)
- ✅ **Input Validation**: `@NotBlank`, `@Email`, `@Size` annotations
- ✅ **Global Exception Handling**: Secure error messages (no stack traces exposed)
- ✅ **Role-Based Access Control**: USER vs ADMIN roles enforced

### **Secret Management**
```properties
jwt.secret=naveensatvikSecretKey2025ComplaintManagementSystemJWT
jwt.expiration=86400000  # 24 hours in milliseconds
```

---

## 📡 API Endpoints

### **Authentication (Public)**
| Method | Endpoint | Purpose | Status Code |
|--------|----------|---------|-------------|
| POST | `/api/auth/register` | User registration | 200 / 400 |
| POST | `/api/auth/login` | User login (JWT issued) | 200 / 401 |

**Register Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Register Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER"
}
```

### **Complaints (Authenticated Users)**
| Method | Endpoint | Purpose | Auth | Status Code |
|--------|----------|---------|------|-------------|
| POST | `/api/complaints` | Submit new complaint | JWT | 200 / 400 |
| GET | `/api/complaints/my` | Fetch user's complaints | JWT | 200 |

**Create Complaint:**
```json
{\n  "category": "Infrastructure",\n  "description": "Pothole on Main Street needs repair"\n}
```

### **Admin (ADMIN role only)**
| Method | Endpoint | Purpose | Auth | Status Code |
|--------|----------|---------|------|-------------|
| GET | `/api/admin/complaints` | Fetch all complaints | JWT + ADMIN | 200 |
| PUT | `/api/admin/complaints/{id}/status` | Update status | JWT + ADMIN | 200 / 404 |
| DELETE | `/api/admin/complaints/{id}` | Delete complaint | JWT + ADMIN | 200 / 404 |

**Update Status:**
```json
{
  "status": "IN_PROGRESS"
}
```

---

## 🎨 Frontend Features

### **Pages & Components**

| Page | Purpose | Access | Features |
|------|---------|--------|----------|
| **Login** | User authentication | Public | Email/password form, error handling |
| **Register** | New user signup | Public | Name/email/password, validation |
| **User Dashboard** | Submit & track complaints | Protected (USER) | Form to submit, list complaints with status |
| **Admin Dashboard** | Manage all complaints | Protected (ADMIN) | View all, update status, delete, stats |

### **State Management (Zustand)**

**Auth Store:**
- `login()` - authenticate user
- `register()` - create new account
- `logout()` - clear auth state
- `setAuth()` - manual auth state update
- Persists to localStorage

**Complaint Store:**
- `submitComplaint()` - create new complaint
- `fetchComplaints()` - load complaints (role-aware)
- `updateStatus()` - change complaint status
- `deleteComplaint()` - remove complaint

### **UI/UX Highlights**
- ✅ **Responsive Design**: Works on mobile, tablet, desktop
- ✅ **Color-Coded Status**: Yellow (Pending), Blue (In Progress), Green (Resolved), Red (Rejected)
- ✅ **Error Messages**: Clear feedback on failures
- ✅ **Loading States**: Visual feedback during API calls
- ✅ **Form Validation**: Real-time client-side validation
- ✅ **Role-Based Views**: Different UI for USER vs ADMIN

---

## 🚀 Key Technical Concepts Implemented

### **Backend Patterns**
1. **Layered Architecture**: Controller → Service → Repository → Database
2. **Dependency Injection**: Spring `@Autowired` and constructor injection
3. **DTOs (Data Transfer Objects)**: Decouple API contracts from domain models
4. **Entity Relationships**: `@OneToMany` (User → Complaints), `@ManyToOne` (Complaint → User)
5. **JPA/Hibernate**: ORM for database operations
6. **Exception Handling**: `@RestControllerAdvice` for global error handling
7. **JWT Security**: Filter-based authentication pipeline
8. **Spring Data JPA**: Custom query methods in repositories

### **Frontend Patterns**
1. **Component-Based Architecture**: Modular, reusable React components
2. **State Management**: Centralized store with Zustand
3. **Protected Routes**: Route guards for authenticated pages
4. **Async Operations**: Async/await for API calls
5. **TypeScript**: Type safety for components and stores
6. **Tailwind CSS**: Utility-first styling approach
7. **Error Boundaries**: Error handling at component level

---

## 📊 Database Design

### **Users Table**
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Complaints Table**
```sql
CREATE TABLE complaints (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  category VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status ENUM('PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED') DEFAULT 'PENDING',
  user_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🔄 Request-Response Flow Example

### **User Submitting a Complaint (Happy Path)**

1. **Frontend**: User fills form and clicks "Submit"
   ```tsx
   await submitComplaint(category, description);
   ```

2. **Frontend → API**: POST request with JWT token
   ```
   POST /api/complaints
   Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
   Content-Type: application/json
   
   {
     "category": "Infrastructure",
     "description": "Pothole needs repair"
   }
   ```

3. **Backend - Security**: `JwtAuthFilter` validates token
   - Extracts email from token
   - Loads UserDetails
   - Sets SecurityContext

4. **Backend - Controller**: `ComplaintController.submit()` receives request
   - Validates input using `@Valid`
   - Extracts authenticated user email

5. **Backend - Service**: `ComplaintService.submitComplaint()`
   - Finds user by email
   - Creates new Complaint entity
   - Saves to database

6. **Backend - Response**: Returns ComplaintResponse DTO
   ```json
   {
     "id": 1,
     "category": "Infrastructure",
     "description": "Pothole needs repair",
     "status": "PENDING",
     "createdAt": "2025-07-21T10:30:00",
     "submittedBy": "John Doe"
   }
   ```

7. **Frontend**: Updates complaint store & refreshes list
   - User sees complaint in their dashboard
   - Status shows as "PENDING" with yellow badge

---

## 📈 Performance Considerations

### **Optimizations Made**
- ✅ **Lazy Loading**: User details loaded only when needed (`@ManyToOne(fetch = FetchType.LAZY)`)
- ✅ **Stateless Auth**: No database lookups for every request after initial login
- ✅ **Efficient Queries**: JPA Repository methods with proper indexing
- ✅ **Local Storage**: JWT token cached on frontend (no unnecessary API calls)
- ✅ **Frontend State**: Zustand minimizes re-renders

### **Scalability**
- Could add pagination for large complaint lists
- Could implement caching (Redis) for frequently accessed data
- Could add rate limiting on API endpoints
- Database indexing on `user_id`, `email`, `status` fields

---

## 🧪 Testing Workflow

### **Manual Testing with Swagger UI**
1. Open `http://localhost:8080/swagger-ui.html`
2. Test `/api/auth/register` → Create user
3. Test `/api/auth/login` → Get JWT token
4. Click "Authorize" → Paste `Bearer <token>`
5. Test `/api/complaints` → Submit complaint
6. Test `/api/complaints/my` → View your complaints
7. (As Admin) Test `/api/admin/complaints` → View all
8. (As Admin) Test `/api/admin/complaints/{id}/status` → Update status

### **Frontend Testing**
1. Register new user
2. Login with credentials
3. Submit complaint
4. Check status changes in real-time
5. Logout and verify redirect to login

---

## 🎓 Learning Outcomes

### **Backend Skills Demonstrated**
- Spring Boot 3.x configuration and setup
- Spring Security with JWT authentication
- Spring Data JPA for database operations
- REST API design with proper HTTP semantics
- Global exception handling
- Swagger/OpenAPI documentation generation
- Lombok for reducing boilerplate
- MySQL database design and relationships

### **Frontend Skills Demonstrated**
- React 18 with functional components and hooks
- TypeScript for type-safe development
- Zustand for state management
- React Router for client-side routing
- Tailwind CSS for responsive design
- Form handling and validation
- API integration with Fetch API
- Protected routes and role-based rendering

### **Full-Stack Concepts**
- JWT authentication flow
- RESTful API design
- Request/Response serialization
- CORS handling
- Database relationships
- Security best practices
- Responsive UI design

---

## 🚀 Running the Project Locally

### **Prerequisites**
- **Java 17+** (JDK)
- **Maven 3.8+**
- **MySQL 8.0+**
- **Node.js 16+** with npm

### **Backend Setup**
```bash
# 1. Clone repository
git clone https://github.com/nimmalasat/complaint-management-system.git
cd complaint-management-system/backend

# 2. Create MySQL database
mysql -u root -p
CREATE DATABASE complaint_db_new;

# 3. Update credentials in application.properties
# spring.datasource.username=root
# spring.datasource.password=root123

# 4. Run Spring Boot application
mvn spring-boot:run

# 5. Access Swagger UI
# http://localhost:8080/swagger-ui.html
```

### **Frontend Setup**
```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# http://localhost:3000
```

---

## 📸 Key Files & Their Purpose

### **Authentication Layer**
- `JwtUtil.java` - Token generation, validation, expiration check
- `JwtAuthFilter.java` - Intercepts requests, validates JWT
- `SecurityConfig.java` - Spring Security rules, CORS, CSRF settings
- `AuthController.java` - Exposes `/api/auth/register` and `/api/auth/login`
- `AuthService.java` - Implements authentication logic

### **Complaint Management**
- `Complaint.java` - JPA entity with relationships
- `ComplaintService.java` - Core business logic
- `ComplaintController.java` - User complaint endpoints
- `AdminController.java` - Admin-only endpoints
- `ComplaintRepository.java` - Database queries

### **Error Handling**
- `GlobalExceptionHandler.java` - Catches all exceptions, returns structured JSON

### **Frontend State**
- `authStore.ts` - Login/register/logout logic
- `complaintStore.ts` - Complaint CRUD operations
- `ProtectedRoute.tsx` - Guards authenticated pages

---

## 🏆 Project Achievements

✅ **Full-Stack Implementation**: Complete REST API + responsive React UI  
✅ **Secure Authentication**: JWT with role-based access control  
✅ **Production-Ready Code**: Error handling, validation, logging  
✅ **API Documentation**: Auto-generated Swagger UI  
✅ **Database Design**: Normalized schema with relationships  
✅ **Responsive UI**: Mobile-first Tailwind CSS design  
✅ **Clean Code**: Layered architecture, separation of concerns  
✅ **TypeScript**: Type-safe frontend development  

---

## 📝 Language Composition

- **Java**: 49.6% (Backend)
- **TypeScript**: 48.3% (Frontend)
- **Other**: 2.1% (Config, CSS)

---

## 🔗 Repository Links

- **GitHub**: https://github.com/nimmalasat/complaint-management-system
- **Swagger API Docs**: http://localhost:8080/swagger-ui.html (after running)

---

## 👤 Author

**Naveen Satvik N**  
- CS Undergrad @ SJCIT (graduating 2027)  
- Backend & Full-Stack Engineer  
- **LinkedIn**: https://linkedin.com/in/naveensatvik  
- **GitHub**: https://github.com/nimmalasat  

---

## 📄 License

This project is open source and available under the MIT License.

---

**Generated**: July 21, 2025

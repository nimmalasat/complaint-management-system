# Complaint Management REST API 🚀

A production-style backend REST API built with **Spring Boot**, featuring JWT authentication, role-based access control, and auto-generated Swagger documentation.

> A modern rebuild of my original [Java Servlet-based complaint system](https://github.com/nimmalasat/Java-Complaint-Management-projects), demonstrating the evolution from monolithic JSP architecture to a clean, stateless REST API.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Spring Boot 3.2 |
| Security | Spring Security + JWT (JJWT) |
| Database | MySQL + Spring Data JPA / Hibernate |
| Documentation | Swagger / OpenAPI 3 (SpringDoc) |
| Build Tool | Maven |
| Language | Java 17 |

---

## ✨ Features

- ✅ User Registration & Login with JWT token issuance
- ✅ Role-based access control (USER / ADMIN)
- ✅ Submit, view, and track complaints
- ✅ Admin dashboard — view all complaints, update status, delete
- ✅ Global exception handling with structured error responses
- ✅ Input validation with meaningful error messages
- ✅ Stateless authentication (no sessions)
- ✅ Auto-generated API docs via Swagger UI

---

## 📡 API Endpoints

### Auth (Public)
```
POST  /api/auth/register   → Register new user
POST  /api/auth/login      → Login and get JWT token
```

### Complaints (Authenticated Users)
```
POST  /api/complaints      → Submit a complaint
GET   /api/complaints/my   → View my complaints
```

### Admin (ADMIN role only)
```
GET    /api/admin/complaints              → View all complaints
PUT    /api/admin/complaints/{id}/status  → Update complaint status
DELETE /api/admin/complaints/{id}         → Delete a complaint
```

---

## 🚀 How to Run Locally

### Prerequisites
- Java 17+
- MySQL 8.0+
- Maven 3.8+
- IntelliJ IDEA (recommended)

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/nimmalasat/complaint-management-springboot.git
cd complaint-management-springboot
```

**2. Set up MySQL**
```sql
CREATE DATABASE complaint_db;
```

**3. Update application.properties**
```properties
spring.datasource.username=root
spring.datasource.password=your_password_here
```

**4. Run the application**
```bash
mvn spring-boot:run
```

**5. Access Swagger UI**
```
http://localhost:8080/swagger-ui.html
```

---

## 📸 Screenshots

### Swagger UI — All Endpoints
> Add screenshot here after running

### Login & JWT Response
> Add screenshot here after testing

### Admin Dashboard in Postman
> Add screenshot here

---

## 🔐 How to Test with Swagger

1. Open `http://localhost:8080/swagger-ui.html`
2. Call `POST /api/auth/register` to create a user
3. Call `POST /api/auth/login` — copy the `token` from the response
4. Click **Authorize** (top right) → paste `Bearer <your_token>`
5. Now test all secured endpoints directly from the browser

---

## 🏗️ Project Structure

```
src/main/java/com/naveen/complaint/
├── ComplaintApiApplication.java
├── controller/
│   ├── AuthController.java
│   ├── ComplaintController.java
│   └── AdminController.java
├── service/
│   ├── AuthService.java
│   └── ComplaintService.java
├── repository/
│   ├── UserRepository.java
│   └── ComplaintRepository.java
├── model/
│   ├── User.java
│   └── Complaint.java
├── dto/
│   ├── AuthDTO.java
│   └── ComplaintDTO.java
├── security/
│   ├── JwtUtil.java
│   └── JwtAuthFilter.java
├── config/
│   ├── SecurityConfig.java
│   └── SwaggerConfig.java
└── exception/
    └── GlobalExceptionHandler.java
```

---

## 🔄 Comparison: Servlet vs Spring Boot

| Feature | Original (Servlet + JSP) | This Version (Spring Boot) |
|---|---|---|
| Architecture | Monolithic MVC | Layered REST API |
| Auth | Session-based | Stateless JWT |
| DB Layer | Raw JDBC | JPA / Hibernate |
| API Docs | None | Auto-generated Swagger |
| Deployment | Apache Tomcat (manual) | Embedded Tomcat |

---

## 👤 Author

**Naveen Satvik N**
- CS Undergrad @ SJCIT (graduating 2027)
- Backend & AI Engineering | Java · Spring Boot · REST APIs
- [LinkedIn](https://linkedin.com/in/naveensatvik) | [GitHub](https://github.com/nimmalasat)

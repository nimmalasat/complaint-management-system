# 🚀 Complaint Management System - Complete Setup Guide

## 📥 **Download Your Files**

You have **2 files** ready to download:

1. **`complaint-management-springboot.zip`** (Backend - Spring Boot API)
2. **`complaint-management-dashboard.zip`** (Frontend - React)

Both files are in `/outputs` folder.

---

## 📁 **Folder Structure Setup**

### **Step 1: Create Main Folder**

Create this folder structure on your computer:

```
C:\Users\YourUsername\complaint-management-system\
├── backend\              (Spring Boot)
└── frontend\             (React)
```

Or use any location you prefer (e.g., `D:\projects\`, `Documents\`, etc.)

---

## 🔧 **Installation Steps**

### **BACKEND SETUP (Spring Boot)**

#### **Step 1: Extract Backend Files**

1. Download `complaint-management-springboot.zip`
2. Extract it to: `C:\Users\YourUsername\complaint-management-system\backend\`
3. You should see:
   ```
   backend/
   ├── src/
   ├── target/
   ├── pom.xml
   └── README.md
   ```

#### **Step 2: Open in IntelliJ IDEA**

1. Open **IntelliJ IDEA**
2. Click **File** → **Open**
3. Navigate to `backend/complaint-api/` folder
4. Click **Open**
5. Wait for Maven to download dependencies (5-10 minutes)

#### **Step 3: Update MySQL Password**

1. Open: `src/main/resources/application.properties`
2. Find: `spring.datasource.password=root123`
3. Replace `root123` with your MySQL password
4. **Save the file**

#### **Step 4: Run the Backend**

1. Right-click `ComplaintApiApplication.java`
2. Click **Run**
3. Wait for console to show:
   ```
   ✅ Complaint Management API is running!
   📖 Swagger UI: http://localhost:8080/swagger-ui.html
   ```

✅ **Backend is now LIVE at** `http://localhost:8080`

---

### **FRONTEND SETUP (React)**

#### **Step 1: Extract Frontend Files**

1. Download `complaint-management-dashboard.zip`
2. Extract it to: `C:\Users\YourUsername\complaint-management-system\frontend\`
3. You should see:
   ```
   frontend/
   ├── src/
   ├── package.json
   ├── vite.config.ts
   └── README.md
   ```

#### **Step 2: Install Dependencies**

1. Open **Command Prompt** or **PowerShell**
2. Navigate to frontend folder:
   ```bash
   cd C:\Users\YourUsername\complaint-management-system\frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Wait 2-5 minutes for installation to complete

#### **Step 3: Start Frontend**

In the same Command Prompt, run:

```bash
npm run dev
```

You should see:
```
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

✅ **Frontend is now LIVE at** `http://localhost:3000`

---

## 🧪 **Testing the Complete System**

### **Test 1: Register a User**

1. Open browser: `http://localhost:3000`
2. Click **"Sign up"**
3. Fill in:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`
4. Click **Sign Up**
5. You should be redirected to the **User Dashboard**

### **Test 2: Submit a Complaint**

1. Click **"Submit New Complaint"**
2. Fill in:
   - Category: `Infrastructure Issue`
   - Description: `Broken water pipe in building`
3. Click **Submit**
4. Complaint should appear in the list with **PENDING** status

### **Test 3: Check API Documentation**

1. Open: `http://localhost:8080/swagger-ui.html`
2. You should see all REST API endpoints
3. Click **Try it out** on any endpoint to test it

### **Test 4: Admin Access (Optional)**

To test admin features, you need to manually update the database:

1. Open **MySQL Workbench**
2. Connect to your database
3. Run this SQL:
   ```sql
   USE complaint_db;
   UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';
   ```
4. Logout and login again
5. You should now see the **Admin Dashboard** with all complaints and statistics

---

## 📂 **File Locations Quick Reference**

| Component | Location |
|-----------|----------|
| Backend Files | `backend/complaint-api/` |
| Frontend Files | `frontend/` |
| Backend Config | `backend/complaint-api/src/main/resources/application.properties` |
| Frontend Config | `frontend/vite.config.ts` |
| Backend API | http://localhost:8080 |
| Frontend App | http://localhost:3000 |
| Swagger Docs | http://localhost:8080/swagger-ui.html |

---

## 🐛 **Troubleshooting**

### **Frontend won't connect to Backend**

**Solution:**
1. Make sure Spring Boot is running (check terminal for "running" message)
2. Check if both are using correct ports (8080 and 3000)
3. Check `vite.config.ts` has correct proxy settings

### **MySQL Connection Error**

**Solution:**
1. Check MySQL password in `application.properties`
2. Make sure MySQL service is running
3. Verify database `complaint_db` exists

### **npm install fails**

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try install again
npm install
```

### **Port already in use**

**Solution:**
If port 3000 or 8080 is already in use:

**For Frontend (Port 3000):**
Edit `vite.config.ts`:
```javascript
server: {
  port: 3001,  // Change to 3001 or any free port
}
```

**For Backend (Port 8080):**
Edit `application.properties`:
```properties
server.port=8081  # Change to any free port
```

---

## 📤 **Deploy to Production**

### **Deploy Backend (Spring Boot)**

**Option 1: Heroku**
```bash
cd backend/complaint-api
heroku login
heroku create your-app-name
git push heroku main
```

**Option 2: AWS/Google Cloud**
- Build JAR: `mvn clean package`
- Upload to cloud provider
- Configure database connection

### **Deploy Frontend (React)**

**Option 1: Vercel (Recommended)**
```bash
npm i -g vercel
cd frontend
vercel
```

**Option 2: Netlify**
```bash
npm run build
# Upload 'dist' folder to Netlify
```

**Option 3: GitHub Pages**
- Update `vite.config.ts` with your domain
- Push to GitHub
- Enable GitHub Pages in repo settings

---

## ✅ **Final Checklist**

- [ ] Downloaded both ZIP files
- [ ] Extracted backend to `backend/` folder
- [ ] Extracted frontend to `frontend/` folder
- [ ] Updated MySQL password in `application.properties`
- [ ] Ran `npm install` for frontend
- [ ] Spring Boot backend running on port 8080
- [ ] React frontend running on port 3000
- [ ] Tested registration and complaint submission
- [ ] Verified Swagger API documentation
- [ ] Created test accounts for USER and ADMIN roles

---

## 🎯 **Next Steps**

1. **Test Everything Locally** ✅
2. **Push to GitHub:**
   ```bash
   # Backend
   cd backend/complaint-api
   git init
   git add .
   git commit -m "Backend: Complaint Management REST API"
   git remote add origin https://github.com/YOUR_USERNAME/complaint-management-springboot.git
   git push -u origin main

   # Frontend
   cd ../../frontend
   git init
   git add .
   git commit -m "Frontend: Complaint Management Dashboard"
   git remote add origin https://github.com/YOUR_USERNAME/complaint-management-dashboard.git
   git push -u origin main
   ```

3. **Update LinkedIn Profile** with project links
4. **Deploy to Production** (Vercel + Heroku or similar)
5. **Share Live Demo** with recruiters

---

## 📞 **Support**

If you face any issues:
1. Check the **Troubleshooting** section above
2. Review the **README.md** files in each project
3. Check browser console for error messages (F12)
4. Check terminal for error logs

---

## 🎉 **Congratulations!**

You now have a **complete full-stack application** ready to impress recruiters!

- ✅ Professional REST API with JWT authentication
- ✅ Beautiful React dashboard with Tailwind CSS
- ✅ Role-based access control (USER/ADMIN)
- ✅ Production-ready code
- ✅ Auto-generated API documentation

**Time to show the world what you've built! 🚀**

---

**Questions? Refer back to this guide or check the README files in each project folder.**

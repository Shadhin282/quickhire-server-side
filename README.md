# 🚀 QuickHire - Job Portal Backend API

A robust, production-ready backend API for the QuickHire job portal platform. Built with Express.js, TypeScript, Prisma ORM, and PostgreSQL. Provides comprehensive job management, user authentication, and application tracking capabilities.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Authentication & Authorization](#authentication--authorization)
- [Business Logic](#business-logic)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Database Operations](#database-operations)
- [Error Handling](#error-handling)
- [Security](#security)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## 📱 Project Overview

**QuickHire Backend** is a comprehensive REST API that powers the QuickHire job portal platform. It manages:

- 👥 **User Management** - Registration, authentication, and role-based access control
- 💼 **Job Management** - Create, read, update, and delete job postings
- 📋 **Applications** - Track job applications from candidates
- 🔐 **Security** - JWT-based authentication with role-based authorization
- 🗄️ **Database** - PostgreSQL with Prisma ORM for data persistence

### Key Features

- ✅ RESTful API design with proper HTTP methods
- ✅ JWT authentication with 24-hour token expiration
- ✅ Role-based access control (USER, ADMIN)
- ✅ Advanced job search and filtering
- ✅ Type-safe development with TypeScript
- ✅ Database migrations with Prisma
- ✅ Comprehensive error handling
- ✅ CORS enabled for cross-origin requests
- ✅ Seeding scripts for sample data
- ✅ Production-ready architecture

---

## 🏗️ Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Application                       │
│               (Next.js - @quickhire-client-side)             │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/HTTPS Requests
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    Express.js Server                         │
│         (TypeScript - @quickhire-server-side)               │
├─────────────────────────────────────────────────────────────┤
│  Routes       │ Middlewares      │ Controllers  │ Services   │
├─────────────────────────────────────────────────────────────┤
│  /auth        │ Authentication   │ Auth         │ Auth       │
│  /jobs        │ Authorization    │ Jobs         │ Jobs       │
│  /applications│ Error Handling   │ Application  │ Application│
└────────────┬─────────────────────────────────────────────────┘
             │ Prisma ORM
             ↓
┌─────────────────────────────────────────────────────────────┐
│              PostgreSQL Database                             │
├─────────────────────────────────────────────────────────────┤
│  users  │  jobs  │  applications  │  roles                  │
└─────────────────────────────────────────────────────────────┘
```

### Layered Architecture

```
API Layer (Routes)
      ↓
Controller Layer (Request Handling)
      ↓
Service Layer (Business Logic)
      ↓
Data Layer (Prisma ORM)
      ↓
Database (PostgreSQL)
```

---

## 🛠️ Tech Stack

### Core Framework
- **Express.js 5.2.1** - Web server framework
- **TypeScript 6.0.2** - Type-safe development
- **Node.js 18+** - JavaScript runtime

### Database & ORM
- **PostgreSQL** - Relational database
- **Prisma 7.6.0** - Modern ORM with type safety
- **pg 8.20.0** - PostgreSQL client

### Authentication & Security
- **jsonwebtoken 9.0.3** - JWT token generation and verification
- **bcrypt 6.0.0** - Password hashing and encryption
- **CORS 2.8.6** - Cross-Origin Resource Sharing

### Validation & Utilities
- **zod 4.3.6** - Schema validation
- **dotenv 17.3.1** - Environment variable management
- **http-status 2.1.0** - HTTP status code constants

### Development Tools
- **ts-node-dev 2.0.0** - TypeScript development server with auto-reload
- **ESLint 10.1.0** - Code quality and linting
- **Prettier 3.8.1** - Code formatting
- **Prisma CLI** - Database migrations and schema management

---

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js** - Version 18 or higher ([Download](https://nodejs.org/))
- **npm** - Version 9 or higher (comes with Node.js)
- **PostgreSQL** - Version 12 or higher ([Download](https://www.postgresql.org/))
- **Git** - For version control ([Download](https://git-scm.com/))
- **Postman** or **Thunder Client** - For API testing (optional)

### Verify Installation
```bash
node --version      # Should be v18 or higher
npm --version       # Should be 9 or higher
psql --version      # Should be 12 or higher
```

---

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/quickhire.git
cd quickhire/quickhire-server-side
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
# Copy the example environment file
cp .env.example .env

# Or create .env manually with required variables (see next section)
```

### 4. Setup Database
```bash
# Create a PostgreSQL database
createdb quickhire_db

# Or use your preferred PostgreSQL client
```

### 5. Run Migrations
```bash
# Create database schema
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate
```

### 6. Seed Sample Data (Optional)
```bash
# Seed admin user
npm run seed:admin

# Seed sample jobs
npm run seed:jobs
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/quickhire_db

# JWT Secret (Use a strong random string in production)
JWT_SECRET=your-super-secret-jwt-key-here-min-32-chars

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### Variable Explanation

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment | `development` / `production` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key-min-32-chars` |
| `CORS_ORIGIN` | Allowed client origin | `http://localhost:3000` |

### Environment Configurations

**Development:**
```env
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/quickhire_dev
JWT_SECRET=dev-secret-key-change-in-production
CORS_ORIGIN=http://localhost:3000
```

**Production:**
```env
PORT=3001
NODE_ENV=production
DATABASE_URL=postgresql://user:securepass@prod-db-host:5432/quickhire
JWT_SECRET=prod-strong-secret-key-min-64-chars
CORS_ORIGIN=https://quickhire.example.com
```

---

## 🚀 Running Locally

### Start Development Server
```bash
npm run dev
```

Expected output:
```
Database connected successfully
Example app listening on port 3001
```

### Verify Server is Running
```bash
# Test health check
curl http://localhost:3001/

# Response: "Hello from Quick Hire!"
```

### Test API Endpoints
```bash
# Register a new user
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

# Get all jobs
curl http://localhost:3001/api/v1/jobs
```

---

## 🗄️ Database Schema

### Database Structure

```sql
-- Users Table
users (
  id: UUID (Primary Key)
  name: String
  email: String (Unique)
  password: String (Hashed)
  role: Enum (USER, ADMIN) - Default: USER
  createdAt: DateTime
  updatedAt: DateTime
)

-- Jobs Table
jobs (
  id: UUID (Primary Key)
  title: String
  company: String
  location: String
  category: String
  type: String
  description: String
  shortDescription: String
  requirements: String[] (Array)
  benefits: String[] (Array)
  salary: String
  postedDate: String
  logo: String
  logoColor: String
  tags: String[] (Array)
  createdAt: DateTime
  updatedAt: DateTime
)

-- Applications Table
applications (
  id: UUID (Primary Key)
  jobId: UUID (Foreign Key → jobs.id)
  name: String
  email: String
  phone: String
  coverLetter: String
  resumeLink: String
  appliedAt: DateTime
)
```

### Entity Relationships

```
User (1) ─────────────── (Many) Application
                              │
                              └─────────── (1) Job (1) ────────────── (Many) Application
```

### Prisma Models

```typescript
// User Model
model User {
  id        String    @id @default(uuid())
  name      String
  email     String    @unique
  password  String
  role      UserRole  @default(USER)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

// Job Model
model Job {
  id               String        @id @default(uuid())
  title            String
  company          String
  location         String
  category         String
  type             String
  description      String
  shortDescription String
  requirements     String[]
  benefits         String[]
  salary           String
  postedDate       String
  logo             String
  logoColor        String
  tags             String[]
  applications     Application[]
  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt
}

// Application Model
model Application {
  id          String   @id @default(uuid())
  jobId       String
  job         Job      @relation(fields: [jobId], references: [id], onDelete: Cascade)
  name        String
  email       String
  phone       String
  coverLetter String
  resumeLink  String
  appliedAt   DateTime @default(now())
}
```

---

## 📚 API Documentation

### Base URL
```
Development: http://localhost:3001/api/v1
Production:  https://your-domain.com/api/v1
```

### Response Format
All endpoints return responses in this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

### 🔐 Authentication Endpoints

#### Register New User
```
POST /api/v1/auth/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "USER"          // Optional, defaults to USER
}

Response (201 Created):
{
  "success": true,
  "message": "User Registered Successfully",
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "id": "uuid-123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER"
    }
  }
}
```

#### Login User
```
POST /api/v1/auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (200 OK):
{
  "success": true,
  "message": "User logged in Successfully",
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "id": "uuid-123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER"
    }
  }
}
```

---

### 💼 Job Endpoints

#### Get All Jobs (With Filtering)
```
GET /api/v1/jobs
Query Parameters:
  - search: string (optional) - Search by title or category
  - category: string (optional) - Filter by category
  - location: string (optional) - Filter by location

Examples:
GET /api/v1/jobs
GET /api/v1/jobs?search=developer
GET /api/v1/jobs?category=Technology&location=New York
GET /api/v1/jobs?search=python&category=Technology

Response (200 OK):
{
  "success": true,
  "message": "Jobs retrieved successfully",
  "data": [
    {
      "id": "uuid-123",
      "title": "Senior React Developer",
      "company": "Tech Corp",
      "location": "San Francisco",
      "category": "Technology",
      "type": "Full-time",
      "description": "We are looking for...",
      "shortDescription": "Looking for Senior React Developer",
      "requirements": ["5+ years React", "TypeScript"],
      "benefits": ["Health Insurance", "Remote Work"],
      "salary": "$150,000 - $200,000",
      "postedDate": "2024-01-15",
      "logo": "techcorp.png",
      "logoColor": "bg-blue-500",
      "tags": ["React", "TypeScript", "Remote"],
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Get Single Job
```
GET /api/v1/jobs/:id

Example: GET /api/v1/jobs/uuid-123

Response (200 OK):
{
  "success": true,
  "message": "Job retrieved successfully",
  "data": {
    "id": "uuid-123",
    "title": "Senior React Developer",
    "company": "Tech Corp",
    ...
  }
}

Error Response (404 Not Found):
{
  "success": false,
  "message": "Job not found",
  "data": null
}
```

#### Create Job (Admin Only)
```
POST /api/v1/jobs
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "title": "Senior React Developer",
  "company": "Tech Corp",
  "location": "San Francisco",
  "category": "Technology",
  "type": "Full-time",
  "description": "We are looking for experienced React developers...",
  "shortDescription": "Looking for Senior React Developer",
  "requirements": ["5+ years React", "TypeScript", "Node.js"],
  "benefits": ["Health Insurance", "Remote Work", "401k"],
  "salary": "$150,000 - $200,000",
  "postedDate": "2024-01-15",
  "logo": "techcorp.png",
  "logoColor": "bg-blue-500",
  "tags": ["React", "TypeScript", "Remote"]
}

Response (201 Created):
{
  "success": true,
  "message": "Job created successfully",
  "data": {
    "id": "uuid-123",
    "title": "Senior React Developer",
    ...
  }
}

Error Response (401 Unauthorized):
{
  "success": false,
  "message": "Unauthorized - Admin role required",
  "data": null
}
```

#### Delete Job (Admin Only)
```
DELETE /api/v1/jobs/:id
Authorization: Bearer {token}

Example: DELETE /api/v1/jobs/uuid-123

Response (200 OK):
{
  "success": true,
  "message": "Job deleted successfully",
  "data": null
}

Error Response (401 Unauthorized):
{
  "success": false,
  "message": "Unauthorized - Admin role required",
  "data": null
}
```

---

### 📋 Application Endpoints

#### Submit Job Application
```
POST /api/v1/applications
Content-Type: application/json

Request Body:
{
  "jobId": "uuid-123",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-0123",
  "coverLetter": "I am very interested in this position because...",
  "resumeLink": "https://example.com/resume.pdf"
}

Response (201 Created):
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "id": "app-uuid-456",
    "jobId": "uuid-123",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-0123",
    "coverLetter": "I am very interested...",
    "resumeLink": "https://example.com/resume.pdf",
    "appliedAt": "2024-01-15T11:00:00Z"
  }
}

Error Response (400 Bad Request):
{
  "success": false,
  "message": "Missing required fields",
  "data": null
}
```

---

## 🔐 Authentication & Authorization

### JWT Token Structure

```typescript
Token Payload:
{
  id: string;        // User UUID
  name: string;      // User name
  email: string;     // User email
  role: "USER" | "ADMIN";  // User role
  iat: number;       // Issued at timestamp
  exp: number;       // Expiration timestamp (24 hours)
}

Token Format: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.{payload}.{signature}
```

### Authentication Flow

```
1. User Registration/Login
   ↓
2. Password hashed with bcrypt (salt: 8)
   ↓
3. JWT token generated with 24-hour expiration
   ↓
4. Token sent to client
   ↓
5. Client stores token (localStorage/sessionStorage)
   ↓
6. Client sends token in Authorization header for protected routes
   ↓
7. Server verifies token with middleware
   ↓
8. Access granted/denied based on role and token validity
```

### Using Authentication Tokens

Include the token in the Authorization header for protected endpoints:

```bash
# Using curl
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:3001/api/v1/jobs

# Using JavaScript Fetch
fetch('http://localhost:3001/api/v1/jobs', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

# Using Axios
axios.get('http://localhost:3001/api/v1/jobs', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

### Role-Based Access Control

```typescript
// ADMIN role required endpoints
POST   /api/v1/jobs              (Create job)
DELETE /api/v1/jobs/:id          (Delete job)

// Public endpoints (no auth required)
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/jobs
GET    /api/v1/jobs/:id

// All users
POST   /api/v1/applications
```

---

## 💼 Business Logic

### 1. User Registration Logic

```
Flow:
1. Receive registration request with name, email, password, role
2. Hash password using bcrypt (salt rounds: 8)
3. Create user in database
4. Generate JWT token with user data
5. Return token and user info (without password)
6. Token valid for 24 hours
```

**Key Points:**
- Passwords are hashed before storage (never stored in plain text)
- Default role is USER if not specified
- Email must be unique in the system
- JWT expires after 24 hours

### 2. User Login Logic

```
Flow:
1. Receive login request with email and password
2. Find user by email in database
3. Compare provided password with stored hash using bcrypt
4. If match:
   - Generate JWT token with user data
   - Return token and user info
5. If no match:
   - Throw "Invalid credentials" error
```

**Key Points:**
- Password comparison is done securely using bcrypt
- User must exist in database
- Credentials must be exactly correct
- Returns same format as registration

### 3. Job Search & Filter Logic

```
Flow:
1. Receive GET request with optional filters: search, category, location
2. Build database query with WHERE conditions
3. Apply filters:
   - search: Match against title OR category (case-insensitive)
   - category: Match exact category (case-insensitive)
   - location: Match exact location (case-insensitive)
4. Return matching jobs
5. Combine multiple filters with AND logic
```

**Example Queries:**
```
// No filter - Get all jobs
GET /jobs

// Search only
GET /jobs?search=developer
WHERE title LIKE '%developer%' OR category LIKE '%developer%'

// Multiple filters
GET /jobs?search=python&category=Technology&location=Remote
WHERE (title LIKE '%python%' OR category LIKE '%python%')
  AND category LIKE '%Technology%'
  AND location LIKE '%Remote%'
```

### 4. Job Creation Logic (Admin Only)

```
Flow:
1. Receive POST request with job details
2. Verify user is authenticated
3. Verify user has ADMIN role
4. Validate all required fields present
5. Create job record in database
6. Generate UUID for job
7. Set creation timestamp
8. Return created job
```

**Authorization Check:**
```
if (!token) → Error 401 "Token not found"
if (user role !== ADMIN) → Error 403 "Forbidden"
Otherwise → Proceed with creation
```

### 5. Job Application Logic

```
Flow:
1. Receive application request with job ID and applicant details
2. Validate all required fields (name, email, phone, etc.)
3. Create application record in database
4. Link application to job via jobId
5. Set application timestamp
6. Return created application
```

**Cascade Delete:**
- If a job is deleted, all associated applications are automatically deleted
- Maintains referential integrity

### 6. Token Verification Middleware

```
Flow:
1. Extract Authorization header
2. Remove "Bearer " prefix if present
3. Verify token signature using JWT secret
4. Check token expiration
5. Decode token payload
6. Verify user still exists in database
7. Check if user has required role (if specified)
8. Attach user data to request object
9. Proceed to next middleware/controller
10. If verification fails → Return 401 Unauthorized
```

---

## 📂 Project Structure

```
quickhire-server-side/
├── src/
│   ├── app.ts                          # Express app configuration
│   ├── server.ts                       # Server entry point
│   │
│   ├── config/
│   │   └── index.ts                   # Configuration from .env
│   │
│   ├── lib/
│   │   └── prisma.ts                  # Prisma client instance
│   │
│   ├── middlewares/
│   │   ├── auth.ts                    # JWT authentication middleware
│   │   └── notFound.ts                # 404 not found middleware
│   │
│   ├── modules/
│   │   ├── Auth/
│   │   │   ├── auth.controller.ts     # Authentication logic
│   │   │   ├── auth.service.ts        # Auth business logic
│   │   │   └── auth.route.ts          # Auth routes
│   │   │
│   │   ├── Jobs/
│   │   │   ├── jobs.controller.ts     # Job management logic
│   │   │   ├── jobs.service.ts        # Job business logic
│   │   │   └── jobs.route.ts          # Job routes
│   │   │
│   │   └── Application/
│   │       ├── application.controller.ts   # Application logic
│   │       ├── application.service.ts      # Application business logic
│   │       └── application.route.ts        # Application routes
│   │
│   ├── routes/
│   │   └── index.ts                   # Route orchestration
│   │
│   ├── scripts/
│   │   ├── seedAdmin.ts               # Seed admin user
│   │   └── seedJobs.ts                # Seed sample jobs
│   │
│   ├── generated/
│   │   └── prisma/                    # Prisma generated types
│   │
│   └── errors/                        # Custom error classes
│
├── prisma/
│   ├── schema.prisma                  # Database schema
│   ├── migrations/                    # Migration history
│   └── seed.ts                        # Seed script (optional)
│
├── dist/                              # Compiled JavaScript (output)
├── .env                               # Environment variables
├── .env.example                       # Environment template
├── .gitignore                         # Git ignore rules
├── tsconfig.json                      # TypeScript configuration
├── package.json                       # Dependencies
├── prettier.config.js                 # Code formatting
├── .eslintrc.js                       # Linting rules
└── README.md                          # This file
```

### Key Directories Explained

- **src/** - All TypeScript source code
- **src/modules/** - Feature-based modules (Auth, Jobs, Application)
- **src/middlewares/** - Express middleware functions
- **src/lib/** - Utility and library code
- **prisma/** - Database schema and migrations
- **dist/** - Compiled JavaScript output (created by `npm run build`)

---

## 📜 Available Scripts

### Development
```bash
npm run dev
# Start development server with auto-reload
# Uses ts-node-dev for fast compilation
# Port: 3001 (or specified in .env)
```

### Production Build
```bash
npm run build
# Compile TypeScript to JavaScript
# Output: dist/ directory
# Run with: npm start
```

### Production Server
```bash
npm start
# Run compiled JavaScript server
# Must build first with: npm run build
```

### Linting
```bash
npm run lint
# Check code quality with ESLint
# Shows errors and warnings

npm run lint:fix
# Fix auto-fixable linting issues
```

### Code Formatting
```bash
npm run format
# Format all files with Prettier
# Ensures consistent code style
```

### Database Seeding
```bash
npm run seed:admin
# Seed a sample admin user into database

npm run seed:jobs
# Seed sample job postings into database
```

---

## 🔐 Database Operations

### Prisma Migrations

```bash
# Create new migration
npx prisma migrate dev --name description_of_change

# Apply pending migrations
npx prisma migrate deploy

# Reset database (CAUTION - deletes all data)
npx prisma migrate reset

# View migration status
npx prisma migrate status

# Generate Prisma Client types
npx prisma generate
```

### Prisma Studio (Visual Database Manager)
```bash
# Open interactive database browser
npx prisma studio

# Access at http://localhost:5555
# View and edit data visually
```

### Database Backup
```bash
# Backup database
pg_dump quickhire_db > backup.sql

# Restore database
psql quickhire_db < backup.sql
```

---

## 🚨 Error Handling

### Error Response Format
```json
{
  "success": false,
  "message": "Human-readable error description",
  "data": null
}
```

### Common HTTP Status Codes

| Status | Meaning | Example |
|--------|---------|---------|
| 200 | OK | Successful GET/POST |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Unhandled exception |

### Error Examples

**Missing Authentication Token:**
```json
{
  "success": false,
  "message": "Token not found",
  "data": null
}
```

**Insufficient Permissions:**
```json
{
  "success": false,
  "message": "User not found or inactive",
  "data": null
}
```

**Invalid Credentials:**
```json
{
  "success": false,
  "message": "Invalid credentials!!",
  "data": null
}
```

**Job Not Found:**
```json
{
  "success": false,
  "message": "Job not found",
  "data": null
}
```

---

## 🔒 Security

### Implemented Security Features

✅ **Password Security**
- Passwords hashed with bcrypt (8 salt rounds)
- Never stored in plain text
- Secure comparison using bcrypt.compare()

✅ **JWT Implementation**
- Signed with secret key
- 24-hour expiration
- Payload includes user data only

✅ **Authentication Middleware**
- Verifies token on protected routes
- Checks user still exists
- Validates role-based access

✅ **CORS Protection**
- Configured to allow only trusted origins
- Prevents unauthorized cross-origin requests

✅ **Data Validation**
- Input validation before processing
- Type checking with TypeScript
- Zod schema validation available

### Security Best Practices

#### Do's ✅
- Use strong JWT_SECRET (minimum 32 characters)
- Enable HTTPS in production
- Use environment variables for secrets
- Hash passwords with bcrypt
- Validate all user inputs
- Use role-based access control
- Keep dependencies updated

#### Don'ts ❌
- Don't commit .env file
- Don't use weak secrets
- Don't store passwords in plain text
- Don't expose error details to clients
- Don't skip validation
- Don't bypass authentication
- Don't use HTTP in production

### Pre-Deployment Checklist

- [ ] Change JWT_SECRET to strong random value
- [ ] Enable HTTPS/SSL
- [ ] Set NODE_ENV=production
- [ ] Configure CORS_ORIGIN for your domain
- [ ] Update DATABASE_URL for production database
- [ ] Run npm audit fix
- [ ] Enable firewall rules
- [ ] Setup database backups
- [ ] Monitor error logs
- [ ] Use environment-specific .env file

---

## 🌐 Deployment

### Option 1: Vercel (Recommended for API)
1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

### Option 2: Railway
1. Create Railway project
2. Connect GitHub repository
3. Add PostgreSQL database
4. Set environment variables
5. Deploy

### Option 3: Heroku
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET=your-secret-key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Option 4: Self-Hosted (Linux Server)
```bash
# 1. SSH into server
ssh user@your-server.com

# 2. Install Node.js and PostgreSQL
sudo apt-get install nodejs npm postgresql

# 3. Clone repository
git clone your-repo
cd quickhire-server-side

# 4. Install dependencies
npm install

# 5. Build
npm run build

# 6. Setup PM2 or systemd for process management
npm install -g pm2
pm2 start dist/server.js --name quickhire

# 7. Setup Nginx as reverse proxy
# Configure Nginx to forward requests to port 3001
```

### Option 5: Docker
```bash
# Build Docker image
docker build -t quickhire-server:latest .

# Run container
docker run -p 3001:3001 \
  -e DATABASE_URL=postgresql://... \
  -e JWT_SECRET=your-secret \
  quickhire-server:latest
```

---

## 🐛 Troubleshooting

### Database Connection Issues

**Error: "Can't reach database server"**
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Or restart it
sudo service postgresql restart

# Verify DATABASE_URL in .env
echo $DATABASE_URL
```

**Error: "No database selected"**
```bash
# Create database
createdb quickhire_db

# Run migrations
npx prisma migrate dev
```

### Port Already in Use

**Error: "EADDRINUSE: address already in use :::3001"**
```bash
# Find process using port 3001
lsof -i :3001

# Kill process
kill -9 <PID>

# Or use different port
PORT=3002 npm run dev
```

### JWT Token Issues

**Error: "Token not found" or "Invalid token"**
```
1. Check Authorization header format: "Bearer YOUR_TOKEN"
2. Verify token hasn't expired (24 hours)
3. Ensure JWT_SECRET is same as when token was created
4. Re-login to get new token
```

### Build Errors

**Error: "Cannot find module"**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Rebuild TypeScript
npm run build
```

**Error: "TypeScript compilation failed"**
```bash
# Check tsconfig.json
# Usually caused by missing types for dependencies
npm install --save-dev @types/package-name
```

---

## 🤝 Contributing

### Contribution Process
1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Standards
- Use TypeScript for all code
- Follow ESLint rules: `npm run lint`
- Format code: `npm run format`
- Add descriptive commit messages
- Update documentation if needed

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/user-profile

# Make changes and commit
git add .
git commit -m "Add user profile endpoint"

# Push to remote
git push origin feature/user-profile

# Create Pull Request on GitHub
```

---

## 📞 Support & Resources

### Getting Help
- 📖 [Express.js Documentation](https://expressjs.com/)
- 🗄️ [Prisma Documentation](https://www.prisma.io/docs/)
- 🔐 [JWT Documentation](https://jwt.io/)
- 🐘 [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- 🔧 [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Additional Documentation
- [Frontend README](../quickhire-client-side/README.md)
- [Setup Guide](../SETUP_COMPLETE.md)
- [API Testing Guide](../API_TESTING_GUIDE.md)
- [Integration Guide](../INTEGRATION_GUIDE.md)

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 🎯 Roadmap

### Planned Features
- [ ] Email notifications for applications
- [ ] Advanced filtering and search
- [ ] Application status tracking
- [ ] Admin dashboard analytics
- [ ] Resume parsing
- [ ] Bulk job import
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Rate limiting
- [ ] Request caching
- [ ] Webhooks support

---

<div align="center">

### Made with ❤️ by the QuickHire Team

**[Live API](https://api.quickhire.com)** • **[Report Bug](../../issues)** • **[Request Feature](../../issues)**

</div>

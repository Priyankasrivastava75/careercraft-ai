# 🚀 CareerCraft AI — Job-Specific Resume Builder & AI Optimizer

**CareerCraft AI** is an intelligent, full-stack web application designed to help job seekers build ATS-compliant resumes, parse uploaded CVs, analyze job postings, calculate 0–100 ATS match scores, and receive AI wording suggestions with one-click resume application.

---

## ✨ Features

- 📄 **Interactive Resume Builder**: Two-column layout with live side-by-side template preview.
- 🎨 **Multi-Template System**: Switch instantly between **Modern**, **Minimal**, and **Professional** ATS-friendly resume designs without losing data.
- 📤 **CV Upload & AI Parsing**: Upload PDF or DOCX files to automatically extract skills, work history, contact details, and education into your profile.
- 🎯 **Job Description Analyzer**: Extract hard technical skills, soft skills, educational criteria, and ATS keywords from job descriptions.
- 📊 **ATS Match Score (0–100)**: Calculate realistic ATS compatibility ratings across 7 categories (Job Match, Skills, Keywords, Structure, Readability, Experience, Education) with transparent explanations.
- 💡 **AI Resume Improvement Suggestions**: Receive targeted wording recommendations (action verbs, keyword additions, summary impact) with side-by-side preview diffs and **"Apply Suggestion"** buttons.
- 🔒 **Secure User Authentication**: JWT token sessions, bcrypt password hashing, and user-isolated MongoDB data security.
- 📊 **Centralized SaaS Dashboard**: Manage saved resumes, duplicate documents, track ATS scans, and launch quick actions.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, HTML5 Canvas / jsPDF
- **Backend**: Node.js, Express.js, Multer, `pdf-parse`, `mammoth`
- **AI Integration**: Google Gemini API (`@google/genai` with `gemini-2.5-flash`)
- **Database**: MongoDB / Mongoose (with `mongodb-memory-server` fallback for zero-config development)
- **Authentication**: JSON Web Tokens (`jsonwebtoken`), `bcryptjs`

---

## 📁 Project Structure

```
CareerCraftAI/
├── src/                        # React Frontend
│   ├── components/             # Reusable UI components
│   │   ├── builder/            # Resume form sections & template components
│   │   ├── Navbar.jsx          # Header navigation
│   │   ├── Footer.jsx          # App footer
│   │   ├── AtsScoreCard.jsx    # ATS Score breakdown card
│   │   ├── AiSuggestionsCard.jsx # AI Suggestions card with preview diff
│   │   ├── UploadCvModal.jsx   # PDF/DOCX CV Upload modal
│   │   └── ProtectedRoute.jsx  # Auth route guard
│   ├── context/                # AuthContext & state providers
│   ├── pages/                  # Page views (Dashboard, ResumeBuilder, JobAnalyzer, Login, Signup)
│   ├── App.jsx                 # App routing configuration
│   └── index.css               # Tailwind CSS design system
│
└── server/                     # Express Backend
    ├── config/                 # Database connection config
    ├── controllers/            # Auth, Resume, and Job AI controllers
    ├── middleware/             # JWT auth & error handling middleware
    ├── models/                 # User and Resume Mongoose schemas
    ├── routes/                 # Express API routes (/api/auth, /api/resumes, /api/jobs)
    ├── services/               # Gemini AI & CV Parser services
    └── server.js               # Express application entrypoint
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=5001
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_here
GEMINI_API_KEY=your_google_gemini_api_key_here
MONGODB_URI=mongodb://localhost:27017/careercraftai
```

> **Note**: If `MONGODB_URI` is not present, the backend automatically starts an in-memory MongoDB server for zero-config development!

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd server
npm install
npm run start
```
The Express backend server will run on `http://localhost:5001`.

### 2. Frontend Setup

In a new terminal window:

```bash
npm install
npm run dev
```
The React frontend dev server will run on `http://localhost:5173`.

---

## 🔌 API Overview

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login user & return JWT token
- `GET /api/auth/me` — Get current user profile (Protected)

### Resumes (`/api/resumes`)
- `GET /api/resumes` — Get all saved resumes for authenticated user
- `GET /api/resumes/:id` — Get single resume document by ID
- `POST /api/resumes` — Create & save a new resume
- `PUT /api/resumes/:id` — Update existing resume
- `DELETE /api/resumes/:id` — Delete resume
- `POST /api/resumes/upload` — Upload PDF/DOCX CV file & parse into structured resume data (Protected)

### AI Jobs & ATS Optimizer (`/api/jobs`)
- `POST /api/jobs/analyze` — Extract technical skills, soft skills, ATS keywords, and responsibilities
- `POST /api/jobs/score` — Calculate 0-100 ATS Match Score across 7 categories
- `POST /api/jobs/suggestions` — Generate actionable resume wording & keyword suggestions

---

## 🤖 How AI & Database Are Used

1. **Gemini 2.5 Flash API**:
   - Executes structured JSON schema prompts to extract skills, calculate 7-category ATS scores, and generate targeted wording suggestions.
   - Includes fallback heuristic parsers for offline/development execution.
2. **MongoDB & Mongoose**:
   - Stores user profiles (with bcrypt hashed passwords) and resume data structures.
   - Restricts all CRUD operations to `user: req.user._id` for data isolation.

---

## 🌐 Deployment Instructions

- **Backend (Render / Railway / Heroku)**:
  - Deploy `server/` subfolder.
  - Set `GEMINI_API_KEY`, `JWT_SECRET`, and `MONGODB_URI` in environment variables.
- **Frontend (Vercel / Netlify)**:
  - Build command: `npm run build`
  - Publish directory: `dist`

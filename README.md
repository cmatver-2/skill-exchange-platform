# 🎓 SkillSwap — Peer-to-Peer Student Skill Exchange Platform

> **A modern university platform connecting students to exchange knowledge, barter skills, and collaborate 1-on-1 — completely free.**

[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v7-ca4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald)](LICENSE)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [How Skill Exchange Works](#-how-skill-exchange-works)
- [Key Features by Module](#-key-features-by-module)
- [Tech Stack](#-tech-stack)
- [Project Architecture & File Structure](#-project-architecture--file-structure)
- [Bilateral Matching Algorithm](#-bilateral-matching-algorithm)
- [Interactive Mock Ecosystem](#-interactive-mock-ecosystem)
- [Team Members & Role Split](#-team-members--role-split)
- [Getting Started](#-getting-started)
- [Step-by-Step Demo Walkthrough (Presentation Guide)](#-step-by-step-demo-walkthrough-presentation-guide)
- [Future Roadmap & Backend / Docker Readiness](#-future-roadmap--backend--docker-readiness)

---

## 🌟 Overview

University campuses are filled with talented students who excel in specific disciplines — computer programming, graphic design, musical instruments, foreign languages, photography, or interview prep. However, students who want to learn often face expensive course fees or rigid class schedules.

**SkillSwap** solves this with a **bilateral skill bartering model**:
* If **Rahul** excels in **C++** and wants to learn **Photoshop**...
* And **Arjun** is an expert in **Photoshop** and wants to learn **C++**...
* SkillSwap detects this **mutual match**, connects them, and facilitates scheduling 1-on-1 peer sessions with verified ratings.

The platform is designed with a cohesive, modern **light-blue & slate theme** with clean typography, high WCAG contrast, interactive user switching, and zero external backend dependencies needed for demo execution.

---

## 🔄 How Skill Exchange Works

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│ 1. Browse & Find│ ────> │ 2. Send Request │ ────> │ 3. Accept Swap  │
│  Search skills  │       │ Propose what to │       │  Teacher agrees │
│ & mutual matches│       │ teach in return │       │   to exchange   │
└─────────────────┘       └─────────────────┘       └─────────────────┘
                                                             │
                                                             ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│ 6. Star Review  │ <──── │  5. Meet & Learn│ <──── │ 4. Lock Session │
│ Verified rating │       │ Google Meet or  │       │ Pick date, time │
│ added to profile│       │ in-person study │       │   & duration    │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

---

## 🚀 Key Features by Module

### 1. 🏠 Landing & Discovery (`/`)
- **Modern Hero Banner**: High-contrast headline (*"Teach what you know. Learn what you dream."*) set against a clean light-blue gradient.
- **Live Campus Metrics**: Dynamic counters displaying active students, skills catalogue size, completed sessions, and platform average ratings.
- **In-Demand Skills Grid**: Live aggregation showing real-time teacher availability for each popular skill.
- **3-Step Process Cards**: Clear visual onboarding explaining how peer exchanges work.

### 2. 🔍 Catalogue & Bilateral Matching (`/search`)
- **Live Search**: Instant client-side search by skill topic, student name, or bio keywords.
- **Category Filter**: Filter across *Programming*, *Design*, *Music*, *Languages*, and *Soft Skills*.
- **Mutual Match Detection**: Automatically highlights students who want what you teach, flagged with a radiant **"✨ Perfect Exchange Match!"** badge.
- **Detailed Student Cards**: Displays teaching proficiency levels (Beginner, Intermediate, Advanced), skills wanted, star ratings, and direct links to profile or exchange proposal.

### 3. 📊 Personal Dashboard (`/dashboard`)
- **Personalized Header**: Dynamic greeting tailored to the active user.
- **KPI Summary Cards**: Overview of pending requests, upcoming sessions, completed sessions, and skills taught.
- **Upcoming Sessions Widget**: Shows study dates, meeting links, and a direct button to mark sessions as completed.
- **Pending Proposals Widget**: Quick action shortcuts to incoming learning requests.

### 4. 👤 Student Profile & Avatar Selector (`/profile/:id`)
- **Campus Profile Card**: Real student avatars with live status badges, rating pills, bio, and campus department metadata.
- **Teaching & Learning Matrices**: Clean dual-column cards detailing verified teaching proficiencies and learning goals.
- **Interests Cloud**: Dynamic tag pills showing personal hobbies and study interests.
- **Interactive Profile Editor**: Edit public bio, interests, and select profile photos with live updates.
- **Verified Review Log**: Chronological list of authentic student reviews, star breakdowns, and feedback comments.

### 5. 📩 Exchange Requests (`/requests`)
- **Incoming vs. Outgoing Tabs**: Clean split view keeping received and sent proposals organized.
- **Interactive Propose Form**: Target any campus student, pick from the skills they teach, and provide an introductory message.
- **Accept & Decline Flow**: Tutors can accept or reject requests with immediate status transitions (`pending` → `accepted` / `rejected`).
- **Schedule Transition**: One-click direct shortcut from an accepted proposal into session scheduling.

### 6. 📅 Session Scheduling & Meet Room (`/sessions`)
- **Smart Booking Form**: Pre-fills from accepted requests; validates against past dates and past times.
- **Meeting Link Support**: Integrated Google Meet links for remote study sessions.
- **Upcoming vs. Completed Views**: Filter between upcoming sessions and session history.
- **Mark as Completed**: Single click marks a completed study session and unlocks the peer review form.

### 7. ⭐ Peer Reviews & Ratings (`/reviews`)
- **5-Star Interactive Rating**: Star rating selector with descriptive tooltips (*Poor*, *Fair*, *Good*, *Very Good*, *Exceptional*).
- **Verified Review Submission**: Validates that only students who completed a learning session can review their teacher.
- **Dynamic Rating Recalculation**: Live calculation of average ratings on the tutor's profile.

### 8. 🛡️ Platform Admin Console (`/admin`)
- **System Governance Overview**: Monitored metrics including total student registrations, catalogue depth, total exchange requests, and study sessions.
- **Student Directory Table**: Searchable directory of registered students with rating inspection.
- **Skills Catalogue Table**: Monitor active tutors and learners per topic across all campus disciplines.

### 9. 🔄 Active User Switcher (Navbar)
- Test the platform from different perspectives with the **Role Switcher dropdown** in the header. Switch between students (e.g., *Rahul*, *Arjun*, *Sneha*, *Priya*) or the *Platform Admin* instantly.

---

## 🛠️ Tech Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend Library** | React 19 (`react`, `react-dom`) | Modern functional components, JSX, custom hooks |
| **Build Tool** | Vite 8.3 | Lightning-fast HMR and production bundling |
| **Routing** | React Router v7 | Declarative SPA navigation and dynamic parameters (`/profile/:id`) |
| **Styling** | Vanilla CSS3 + Tailwind CSS v4 | Cohesive Design System variables with utility classes |
| **State Management** | React Context (`AppContext`) | Centralized state with zero external library overhead |
| **Assets & Media** | Local JPGs & Curated CDN | Real campus portraits in `assets/Profile Pics/` |

---

## 📂 Project Architecture & File Structure

```text
skill-exchange-platform/
├── index.html                   # HTML entry point with Plus Jakarta Sans & Tailwind
├── package.json                 # Project dependencies & npm run scripts
├── vite.config.js               # Vite configuration with polling file watcher
│
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # App entry wrapped in AppProvider
│   ├── index.css                # Global Design System tokens & base typography
│   │
│   ├── assets/
│   │   └── Profile Pics/        # Real local student profile photos
│   │       ├── user1.jpg        # Rahul Mehta
│   │       ├── user2.jpg        # Arjun Nair
│   │       ├── user3.jpg        # Sneha Kapoor
│   │       └── user4.jpg        # Aditya Rao
│   │
│   ├── components/
│   │   ├── SkillCard.jsx        # Reusable skill badge card
│   │   ├── SkillCard.css        # SkillCard scoped styling
│   │   └── layout/
│   │       ├── Navbar.jsx       # Sticky navbar with live User Switcher
│   │       └── Footer.jsx       # Footer with 7 team member credits
│   │
│   ├── context/
│   │   └── AppContext.jsx       # Unified state (users, skills, requests, sessions, reviews)
│   │
│   ├── data/                    # Interactive Mock Database
│   │   ├── users.js             # 21 detailed profiles across campus disciplines
│   │   ├── skills.js            # 20 skill topics across 5 major categories
│   │   ├── requests.js          # Learning proposals with statuses
│   │   ├── sessions.js          # Scheduled and completed study sessions
│   │   └── reviews.js           # Verified student feedback and ratings
│   │
│   ├── pages/
│   │   ├── Home/                # Landing page (index.jsx, Home.css)
│   │   ├── SkillSearch/         # Catalogue & StudentCard.jsx
│   │   ├── Dashboard/           # Personal student overview
│   │   ├── Profile/             # User profile and avatar editor
│   │   ├── Requests/            # Incoming/outgoing proposal management
│   │   ├── Sessions/            # Session scheduling & completion
│   │   ├── Reviews/             # 5-star rating submission
│   │   └── Admin/               # Platform administration console
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx        # Route definitions
│   │
│   └── utils/
│       └── skillMatching.js     # Bilateral matching & search helper functions
```

---

## 🧩 Bilateral Matching Algorithm

Located in [`src/utils/skillMatching.js`](src/utils/skillMatching.js), the algorithm evaluates compatibility between the active user and other campus members:

```javascript
// 1. Identify skills user A can teach that user B wants to learn
const canTeach = userA.skillsTaught
  .map(st => st.skillId)
  .filter(id => userB.skillsWanted.some(sw => sw.skillId === id));

// 2. Identify skills user B can teach that user A wants to learn
const canLearn = userB.skillsTaught
  .map(st => st.skillId)
  .filter(id => userA.skillsWanted.some(sw => sw.skillId === id));

// 3. Perfect bilateral match when both conditions are satisfied!
const isMutual = canTeach.length > 0 && canLearn.length > 0;
```

When `isMutual` is true, the user card is highlighted with the purple gradient badge, explaining exactly what each student will teach and learn.

---

## 👥 Interactive Mock Ecosystem

### 21 Total Users (20 Campus Students + 1 Admin)
1. **Rahul Mehta** (CS Backend · C++, Python · wants Photoshop)
2. **Arjun Nair** (Design & Illustration · Photoshop, UI Design · wants C++)
3. **Sneha Kapoor** (Frontend Dev · JavaScript, React · wants Guitar)
4. **Aditya Rao** (Audio & Music · Guitar · wants Figma)
5. **Admin User** (Platform Administration & Safety Oversight)
6. **Priya Sharma** (AI/ML Research · Machine Learning, Python · wants Public Speaking)
7. **Rohan Verma** (Mechanical CAD · 3D Modeling, C++ · wants UI Design)
8. **Ananya Iyer** (HCI & Design Systems · Figma, UI Design · wants React)
9. **Karthik Nair** (Competitive Programming · DSA, C++ · wants Guitar)
10. **Meera Sen** (Film & Media · Video Editing, Photography · wants Python)
11. **Vikram Patel** (Finance & Markets · Financial Literacy, Public Speaking · wants DSA)
12. **Divya Menon** (Languages · French, German · wants Photoshop)
13. **Aman Gupta** (Full-Stack Dev · React, JavaScript · wants 3D Modeling)
14. **Ishaan Malhotra** (Sound Design · Music Production, Piano · wants Figma)
15. **Tanvi Joshi** (Journalism · Content Writing, Public Speaking · wants Video Editing)
16. **Nikhil Deshmukh** (Data Science · Python, ML · wants French)
17. **Pooja Reddy** (Architecture · 3D Modeling, Photography · wants Spanish)
18. **Farhan Ali** (Computer Science · DSA, Python · wants Music Production)
19. **Rhea Chakraborty** (Digital Art · Photoshop, UI Design · wants ML)
20. **Siddharth Das** (Music Academy · Piano, Guitar · wants Financial Literacy)
21. **Kavya Nambiar** (Linguistics · Spanish, French · wants React)

### 20 Campus Skill Offerings
* **Programming**: C++, Python, JavaScript, React, Data Structures & Algorithms, Machine Learning
* **Design**: Photoshop, UI Design, Figma, 3D Modeling (Blender), Video Editing, Photography
* **Music**: Guitar, Keyboard & Piano, Music Production
* **Languages**: Spanish, French, German
* **Soft Skills**: Public Speaking, Financial Literacy, Content Writing

---

## 👨‍💻 Team Members & Role Split

| Member | Assigned Role & Modules | Core Responsibilities |
|---|---|---|
| **Chris** | **Routing & Architecture** | Project structure, React Router v7 configuration, common layout wrapper, build & Git integration |
| **Dane** | **Skill Search & Discovery** | Skill catalogue search, category filters, bilateral matching algorithm (`skillMatching.js`) |
| **Derick** | **Requests & Sessions** | Incoming/outgoing proposal management, validation logic, session scheduling, Meet room links |
| **Govind** | **Profile & Reviews** | Student profile UI, avatar selector, user switcher, 5-star review submission system |
| **Daniel** | **Admin & Dashboard** | Platform governance console, KPI statistics, user and skills directory management |
| **Fahad** | **QA & Evaluation** | Cross-browser compatibility, color contrast/WCAG accessibility, test case verification |
| **Goutham** | **Documentation & Testing** | Project documentation, presentation slides, code comments, and demo workflows |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (bundled with Node.js)

### Installation & Local Run

```bash
# 1. Clone the repository
git clone https://github.com/cmatver-2/skill-exchange-platform.git

# 2. Navigate to the project directory
cd skill-exchange-platform

# 3. Install project dependencies
npm install

# 4. Start the local Vite development server
npm run dev
```

Open your browser and navigate to:
```text
http://localhost:5173/
```

### Production Build Verification

```bash
# Compile and bundle for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 🎬 Step-by-Step Demo Walkthrough (Presentation Guide)

When presenting or testing the full platform flow:

1. **Start on the Home Page (`/`)**:
   - Point out the light-blue hero, live campus metrics, and popular skill cards.
2. **Switch Active Student in the Navbar**:
   - Use the header dropdown to switch to **Arjun Nair** (Design student).
3. **Explore Skills & Find Mutual Matches (`/search`)**:
   - Observe how **Rahul Mehta** is automatically highlighted with a **"✨ Perfect Exchange Match!"** badge (Arjun teaches Photoshop and wants C++; Rahul teaches C++ and wants Photoshop).
4. **Inspect a Profile (`/profile/1`)**:
   - Click **View Profile** to inspect Rahul's teaching skills, learning goals, and verified reviews.
5. **Send an Exchange Proposal (`/requests`)**:
   - Use the left form on the Requests page to propose a swap with any student.
6. **Accept an Incoming Proposal**:
   - Switch to **Incoming Requests** and click **Accept Exchange →**.
7. **Schedule the Study Session (`/sessions`)**:
   - Click **📅 Schedule Session →**, pick a future date and time, and confirm.
8. **Mark Completed & Leave a Review (`/reviews`)**:
   - In Sessions, click **Mark as completed**.
   - Navigate to **Reviews**, select 5 stars, write a comment, and submit. Check the teacher's profile to see the review posted live!
9. **Admin Console (`/admin`)**:
   - Switch active user to **Admin User** and review platform-wide analytics, student rosters, and catalogue demand.

---

## 🔮 Future Roadmap & Backend / Docker Readiness

SkillSwap is architected cleanly with separation of concerns between components, services/utilities, and state. While it operates completely client-side for presentation simplicity:

- **Docker Containerization**: Easily containerize using a multi-stage Dockerfile:
  ```dockerfile
  # Stage 1: Build
  FROM node:20-alpine AS builder
  WORKDIR /app
  COPY package*.json ./
  RUN npm install
  COPY . .
  RUN npm run build

  # Stage 2: Serve
  FROM nginx:alpine
  COPY --from=builder /app/dist /usr/share/nginx/html
  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]
  ```
- **Backend API Integration**: The React Context layer (`AppContext.jsx`) can swap local state setters for RESTful endpoints (`fetch('/api/sessions')`, `fetch('/api/requests')`) backed by Node.js/Express, Spring Boot, or FastAPI.
- **WebRTC Study Rooms**: Transition from Google Meet links to embedded peer-to-peer audio/video calling and shared code editors directly inside the browser.

---

<p align="center">
  <b>SkillSwap</b> · Built with ❤️ by Team of 7 · Web Programming Project 2026
</p>

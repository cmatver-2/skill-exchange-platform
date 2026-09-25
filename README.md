=======
# 🎓 Skill Exchange Platform

A student-to-student learning platform that connects people based on the skills they can teach and the skills they want to learn.

> Example: Rahul knows C++ and wants to learn Photoshop. Arjun knows Photoshop and wants to learn C++. The platform connects them so they can exchange knowledge.

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [How It Works](#how-it-works)
- [Main Parts of the Website](#main-parts-of-the-website)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Team & Work Split](#team--work-split)
- [Final Website Flow](#final-website-flow)
- [Common Topics Everyone Should Know](#common-topics-everyone-should-know)
- [Getting Started](#getting-started)
- [Branching & Workflow](#branching--workflow)

---

## About the Project

The **Skill Exchange Platform** is a frontend web application where students can teach skills they know and learn skills they want to improve — from other students, not a backend server. Since this is a frontend-focused project, the app behaves like a real application using **mock/sample data** instead of a live database.

---

## How It Works

1. **Create an account** — Student creates a profile with name, bio, and interests.
2. **Add skills** — Students list skills they can teach, skills they want to learn, and proficiency level.
3. **Find people** — Search for a skill (e.g. "C++") to see students who can teach it.
4. **Send a learning request** — Reach out to a student explaining what you want to learn.
5. **Accept and schedule** — The other student accepts/rejects the request, then a session is arranged.
6. **Complete the session** — Mark the session as completed once it's done.
7. **Rating and review** — Rate the experience and leave a review.

---

## Main Parts of the Website

| Section | Description |
|---|---|
| 🏠 **Home Page** | Explains the platform, shows popular skills |
| 👤 **User Profiles** | Skills, proficiency, bio, ratings |
| 🔍 **Skill Search** | Find people who teach a particular skill |
| 📩 **Requests** | Manage learning/teaching requests |
| 📅 **Sessions** | Schedule and track learning sessions |
| ⭐ **Reviews** | Rate completed sessions |
| 📊 **Dashboard** | Overview of your skills, requests, and sessions |
| 🛠️ **Admin Panel** | Manage users and skills |

---

## Tech Stack

- **HTML5** — semantic structure
- **CSS3** — Flexbox, Grid, responsive design
- **JavaScript (ES6)** — logic, events, array/object handling
- **React** — components, JSX, props, state, hooks
- **React Router** — client-side navigation
- **Mock Data** — no backend; app runs entirely on sample JSON data

---

## Project Architecture

```
skill-exchange-platform/
├── public/
├── src/
│   ├── assets/                 # images, icons
│   ├── components/             # shared/reusable UI
│   │   ├── layout/               (Navbar, Footer, Sidebar, PageWrapper)
│   │   └── SkillCard.jsx
│   ├── pages/
│   │   ├── Home/                 
│   │   ├── SkillSearch/          
│   │   ├── Profile/               
│   │   ├── Dashboard/            
│   │   ├── Requests/              
│   │   ├── Sessions/              
│   │   ├── Reviews/                
│   │   └── Admin/                  
│   ├── data/                    # mock "database" (JSON/JS arrays)
│   │   ├── users.js
│   │   ├── skills.js
│   │   ├── requests.js
│   │   ├── sessions.js
│   │   └── reviews.js
│   ├── context/                 # shared app state
│   │   └── AppContext.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx         # React Router config
│   ├── utils/                    # helpers (filtering, matching, validation)
│   ├── styles/                   # global CSS, variables
│   └── main.jsx
├── docs/                        # diagrams, screenshots, documentation
├── .gitignore
├── package.json
└── README.md
```

Since there's no backend, all "database" data lives in `src/data/` as mock arrays. A shared `AppContext` keeps state (current user, requests, sessions) in sync across the app so the flow — send request → accept → schedule → complete → review — actually works during a session, and can optionally persist via `localStorage`.

---

## Team & Work Split

### 👤 1. Chris — Project Structure & Integration
**Main work:**
- Overall project structure
- Navigation & React Router
- Common components/layout
- Integrating everyone's modules
- Git/GitHub coordination
- Final testing

**Topics to know:** HTML5 semantic elements · CSS Flexbox/Grid & responsive design · JavaScript basics & ES6 · React components & JSX · Props & State · `useState`, `useEffect` · React Router

---

### 👤 2. Dane — Skills, Search & Matching
**Main work:**
- Skills students can teach/want to learn
- Skill cards
- Search & filtering
- Skill matching
- Student search results

**Topics to know:** HTML forms · CSS Grid/Flexbox · JavaScript arrays & objects · Functions & conditions · Array filtering · Events · React props/state · Conditional rendering

---

### 👤 3. Derick — Learning Requests & Sessions
**Main work:**
- Send learning request
- Incoming/outgoing requests
- Accept/reject requests
- Request status
- Schedule learning sessions
- Upcoming/completed sessions
- Mark session as completed

**Topics to know:** HTML forms & input types · JavaScript functions & events · Form validation · Arrays/objects · React `useState` · `useEffect` · Conditional rendering

---

### 👤 4. Govind — Profile, Dashboard & Reviews
**Main work:**
- Student profile
- Bio/interests
- Skills & proficiency
- Edit profile
- Student dashboard
- Ratings & reviews
- Review submission/display

**Topics to know:** Semantic HTML · Forms · CSS box model/Flexbox · JavaScript objects · DOM manipulation · React components · Props & state · `useState`

---

### 👤 5. Daniel — Admin Panel, Home Page & Documentation
**Main work:**
- Home/landing page
- Popular skills section
- Admin dashboard
- Manage users/skills UI
- Admin tables
- Documentation
- Diagrams & screenshots

**Topics to know:** Semantic HTML · HTML tables/forms · CSS Grid/Flexbox · Responsive design · React components · Props · Basic state management

---

> 💡 Each person owns their module, but everyone helps each other with topics they're less familiar with.

---

## Final Website Flow

```
Home → Search Skills → View Profile → Send Request → Accept → Schedule Session → Complete Session → Review
```

---

## Common Topics Everyone Should Know

- **HTML:** structure, semantic elements, forms, tables
- **CSS:** box model, Flexbox, Grid, media queries
- **JavaScript:** variables, arrays, objects, functions, events, DOM, validation, ES6
- **React:** components, JSX, props, state, `useState`, `useEffect`, routing, conditional rendering

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/<org>/skill-exchange-platform.git
cd skill-exchange-platform

# Install dependencies
npm install

# Run the development server
npm run dev
```

---

## Branching & Workflow

- Work happens in feature branches off `main`, one per module:
  - `feature/chris-routing-integration`
  - `feature/dane-skill-search`
  - `feature/derick-requests-sessions`
  - `feature/govind-profile-dashboard`
  - `feature/daniel-admin-home`
- Open a Pull Request when your module is ready for review.
- At least one teammate (ideally Chris, for integration) reviews before merging into `main`.
- Keep `main` always in a working, buildable state.

---

<p align="center">Built with ❤️ by Chris, Dane, Derick, Govind & Daniel</p>
>>>>>>> e534745c0478ad539f473bd624205cdd2121346f

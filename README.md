# Arif Shekh — AI/ML Developer Portfolio

A production-grade, futuristic 3D developer portfolio and AI laboratory interface engineered for **Arif Shekh** (Diploma Student in Artificial Intelligence & Machine Learning at Theem College of Engineering, Boisar Betagaon).

---

## ⚡ Tech Stack & Architecture

- **Core Framework**: React 18 & Vite 5
- **3D Graphics & WebGL**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Motion & Interactions**: Framer Motion
- **Styling & Design Tokens**: Tailwind CSS, PostCSS, Glassmorphism, Neon Glows
- **Icons**: Lucide React
- **Micro-Interactions**: Custom magnetic cursor, 3D card tilt, particle physics, interactive audio & vision architecture diagrams, canvas confetti

---

## 📁 Project Structure

```
src/
├── assets/                 # Static visual assets
├── components/
│   ├── 3d/
│   │   ├── HeroScene.jsx        # 3D interactive AI core with rotating holographic rings & particles
│   │   └── BackgroundCanvas.jsx # Ambient 3D starfield & neural network background
│   └── ui/
│       ├── CustomCursor.jsx     # Desktop precision magnetic cursor
│       ├── LoadingScreen.jsx    # Cinematic initial loading sequence
│       ├── Navbar.jsx           # Glassmorphism sticky navbar with mobile drawer
│       ├── ProjectModal.jsx     # Cinematic 3D project detail & architecture flow modal
│       └── Footer.jsx           # Technical footer with verified metadata
├── data/
│   ├── profile.js          # Verified profile, education, journey & milestone data
│   ├── skills.js           # 40+ categorized technical skills & highlights
│   ├── projects.js         # 8 featured projects with full architecture pipelines
│   └── socials.js          # Direct communication channels & placeholders
├── sections/
│   ├── HeroSection.jsx     # 3D Hero with real-time status indicator & CTAs
│   ├── AboutSection.jsx    # "Behind the Code" & verified academic profile card
│   ├── SkillsSection.jsx   # 3D tilt cards, search, and category filters
│   ├── ProjectsSection.jsx # Project showcase with architecture flow triggers
│   ├── JourneySection.jsx  # 7-stage evolutionary engineering timeline
│   ├── ChatbotSection.jsx  # "Ask My AI" conversational assistant
│   ├── AchievementsSection.jsx # Verified technical benchmarks & certificate slots
│   ├── GithubSection.jsx   # "Code. Build. Experiment." & API integration
│   └── ContactSection.jsx  # "Let's Build Something Intelligent" transmission form
├── services/
│   ├── api.js              # Base API configuration & request helpers
│   ├── chatbot.js          # Chatbot service (pluggable to Python/Node API + grounded local engine)
│   └── contact.js          # Contact submission service with client validation
├── App.jsx
├── main.jsx
└── index.css               # Global glassmorphism, cyberpunk grid, and glow utilities
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Available environment variables:
- `VITE_API_BASE_URL`: Connects to an external Python (FastAPI/Flask) or Node.js backend. When blank, the site operates with an offline grounded knowledge engine.
- `VITE_GITHUB_USERNAME`: Fetches live public repositories from GitHub. When unset, displays a graceful "GitHub integration coming soon" card with real project metrics.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
Optimized static files will be generated in `dist/` with chunk splitting for high performance.

---

## 🛡️ Verified Candidate Profile

- **Name**: Arif Shekh
- **Role**: Diploma Student — Artificial Intelligence & Machine Learning
- **Institution**: Theem College of Engineering, Boisar Betagaon (MSBTE)
- **Specializations**: Python, Computer Vision, Generative AI & RAG, Full-Stack Development, Embedded IoT
- **Status**: Available for Projects, Internships, and Technical Competitions

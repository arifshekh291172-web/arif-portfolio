export const projectCategories = [
  { id: "all", name: "All Projects" },
  { id: "ai-ml", name: "AI & Machine Learning" },
  { id: "vision", name: "Computer Vision" },
  { id: "iot", name: "IoT & Hardware" },
  { id: "fullstack", name: "Full Stack" },
];

export const projectsData = [
  {
    id: "rag-pdf-chatbot",
    title: "AI / RAG PDF Chatbot",
    category: "ai-ml",
    categoryName: "AI & Machine Learning",
    badge: "Generative AI",
    summary:
      "An AI-powered document question-answering system using PDF ingestion, embeddings, vector search and generative AI.",
    technologies: [
      "Python",
      "Streamlit",
      "Gemini",
      "LangChain",
      "ChromaDB",
      "RAG",
      "Embeddings"
    ],
    features: [
      "PDF upload & parsing",
      "Document processing & chunking",
      "Recursive text splitting",
      "Vector embeddings generation",
      "ChromaDB semantic search",
      "Context-aware answers with Gemini",
      "Interactive chat history"
    ],
    problem:
      "Extracting precise, hallucination-free information from dense, multi-page technical PDFs is time-consuming and prone to human oversight.",
    solution:
      "Engineered an end-to-end RAG architecture that ingests arbitrary PDFs, splits text into semantic chunks, computes high-dimensional embeddings stored in ChromaDB, and performs cosine similarity retrieval to supply grounded context to Google's Gemini LLM.",
    role: "AI Developer & Pipeline Architect",
    result:
      "Delivered instant, verified answers grounded strictly in uploaded documents with zero manual indexing overhead.",
    architecture: [
      { step: "01", name: "PDF Upload", desc: "User submits document via interface" },
      { step: "02", name: "Text Splitting", desc: "Recursive character chunking with overlap" },
      { step: "03", name: "Vector Embeddings", desc: "High-dimensional embedding transformations" },
      { step: "04", name: "ChromaDB Store", desc: "Indexed vector persistence" },
      { step: "05", name: "Semantic Search", desc: "Cosine similarity nearest-neighbor lookup" },
      { step: "06", name: "Gemini Reasoning", desc: "Context-augmented LLM inference" },
      { step: "07", name: "AI Response", desc: "Synthesized output with reference grounding" }
    ],
    github: "https://github.com/arifshekh291172-web/arif-portfolio/tree/main/projects/01-rag-pdf-chatbot",
    liveDemo: null,
    accentColor: "#22d3ee"
  },
  {
    id: "cv-virtual-mouse",
    title: "Computer Vision Virtual Mouse",
    category: "vision",
    categoryName: "Computer Vision",
    badge: "Spatial AI",
    summary: "A hand-gesture controlled virtual mouse using computer vision.",
    technologies: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    features: [
      "Real-time 21-point hand tracking",
      "Index finger landmark detection",
      "Smooth cursor movement mapping",
      "Click gesture trigger (index-thumb pinch)",
      "Adaptive frame smoothing & noise reduction"
    ],
    problem:
      "Traditional physical peripherals are unusable in sterile medical environments, industrial setups, or for individuals with motor-assistive accessibility needs.",
    solution:
      "Constructed an intelligent optical tracking system that isolates hand coordinates through MediaPipe's neural pipeline, maps camera coordinates to display resolution with smoothing algorithms, and dispatches native OS mouse inputs.",
    role: "Computer Vision Engineer",
    result:
      "Achieved stable touchless cursor navigation and pinch-to-click operations at 30+ FPS on consumer webcams.",
    architecture: [
      { step: "01", name: "Webcam Input", desc: "Live video capture via OpenCV" },
      { step: "02", name: "MediaPipe Hands", desc: "21 3D hand landmark localization" },
      { step: "03", name: "Coordinate Normalization", desc: "Scaling bounding area to screen resolution" },
      { step: "04", name: "Gesture Recognition", desc: "Pinch & hover geometric threshold detection" },
      { step: "05", name: "PyAutoGUI Dispatch", desc: "Native OS mouse event execution" }
    ],
    github: "https://github.com/arifshekh291172-web/arif-portfolio/tree/main/projects/02-cv-virtual-mouse",
    liveDemo: null,
    accentColor: "#38bdf8"
  },
  {
    id: "virtual-volume-control",
    title: "Virtual Volume Control",
    category: "vision",
    categoryName: "Computer Vision",
    badge: "HCI Vision",
    summary: "Control system volume using hand gestures and computer vision.",
    technologies: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    features: [
      "Real-time hand tracking",
      "Thumb-to-index finger distance measurement",
      "Dynamic decibel interpolation",
      "Visual HUD level indicator",
      "Low-latency response"
    ],
    problem:
      "Adjusting system media levels during presentations or cooking requires physical contact with keyboards or hardware dials.",
    solution:
      "Built a computer vision utility that calculates Euclidean distance between landmarks 4 (thumb tip) and 8 (index tip), dynamically maps distance ranges into system volume percentages, and overlays interactive HUD graphics onto the webcam feed.",
    role: "Computer Vision Developer",
    result:
      "Zero-latency continuous volume adjustment with visual HUD feedback and intuitive gesture ergonomics.",
    architecture: [
      { step: "01", name: "Webcam Stream", desc: "Frame acquisition and RGB conversion" },
      { step: "02", name: "Landmark Extraction", desc: "Isolating thumb and index tip coordinates" },
      { step: "03", name: "Euclidean Math", desc: "Hypotenuse distance computation" },
      { step: "04", name: "Linear Interpolation", desc: "Mapping pixel span [20-200px] to volume [0-100%]" },
      { step: "05", name: "System Audio Output", desc: "OS master volume modification" }
    ],
    github: "https://github.com/arifshekh291172-web/arif-portfolio/tree/main/projects/03-virtual-volume-control",
    liveDemo: null,
    accentColor: "#a855f7"
  },
  {
    id: "rock-paper-scissors-ai",
    title: "Rock Paper Scissors — AI Vision",
    category: "vision",
    categoryName: "Computer Vision",
    badge: "Interactive AI",
    summary:
      "A real-time computer vision game that recognizes hand gestures through a camera.",
    technologies: ["Python", "OpenCV", "MediaPipe"],
    features: [
      "Optical gesture classification",
      "Finger extension state analysis",
      "Dynamic match round countdown",
      "Autonomous bot move selector",
      "Live score HUD and round refereeing"
    ],
    problem:
      "Demonstrating computer vision concepts in an accessible, interactive manner that non-technical users can instantly test and understand.",
    solution:
      "Programmed a real-time vision game that reads fingertip vertical offsets relative to knuckles to classify closed fists (Rock), open palms (Paper), or dual-finger extensions (Scissors), pitting users against an AI opponent with automated scoring.",
    role: "Sole Developer",
    result:
      "Highly responsive real-time game running at full camera framerate with accurate gesture classification.",
    architecture: [
      { step: "01", name: "Camera Frame", desc: "High frame-rate stream capture" },
      { step: "02", name: "Finger State Vector", desc: "Analyzing tip vs PIP joint positions" },
      { step: "03", name: "Gesture Classifier", desc: "Classifying Rock, Paper, or Scissors" },
      { step: "04", name: "Referee Logic", desc: "Rule engine comparison with bot pick" },
      { step: "05", name: "Screen Display", desc: "Live score overlay and result animation" }
    ],
    github: "https://github.com/arifshekh291172-web/arif-portfolio/tree/main/projects/04-rock-paper-scissors-ai",
    liveDemo: null,
    accentColor: "#ec4899"
  },
  {
    id: "smart-agriculture-system",
    title: "Smart Agriculture Monitoring System",
    category: "iot",
    categoryName: "IoT & Hardware",
    badge: "Smart Hardware",
    summary:
      "IoT-based agricultural monitoring system using sensors to monitor environmental and soil conditions.",
    technologies: [
      "ESP32 / ESP8266",
      "Sensors",
      "Arduino",
      "IoT",
      "Dashboard"
    ],
    features: [
      "Soil moisture telemetry",
      "Ambient temperature & humidity tracking",
      "LDR ambient light sensing",
      "Flame detection safety module",
      "Automated relay pump triggering",
      "Acoustic buzzer alarm"
    ],
    problem:
      "Inefficient manual irrigation leads to severe water waste or crop dehydration, while unattended farms remain vulnerable to environmental hazards and fires.",
    solution:
      "Designed an automated embedded ecosystem using ESP32/ESP8266 microcontrollers that collects analog and digital readings from soil moisture probes, temperature sensors, LDRs, and flame sensors, triggering relays for automated watering and buzzers for hazard protection.",
    role: "IoT Hardware & Firmware Developer",
    result:
      "Automated closed-loop irrigation system with real-time remote telemetry and immediate hazard alerts.",
    architecture: [
      { step: "01", name: "Sensor Array", desc: "Soil moisture, Temp/Humidity, LDR, Flame sensors" },
      { step: "02", name: "Microcontroller ADC", desc: "ESP32/ESP8266 analog-to-digital telemetry read" },
      { step: "03", name: "Threshold Logic", desc: "Firmware rule evaluation for soil moisture & fire" },
      { step: "04", name: "Relay & Buzzer Actuation", desc: "Automated pump power control and audible alarms" },
      { step: "05", name: "Telemetry Dashboard", desc: "Data transmission to IoT dashboard interface" }
    ],
    github: "https://github.com/arifshekh291172-web/arif-portfolio/tree/main/projects/05-smart-agriculture-iot",
    liveDemo: null,
    accentColor: "#10b981"
  },
  {
    id: "smart-canteen-iot",
    title: "Smart Canteen",
    category: "iot",
    categoryName: "IoT & Hardware",
    badge: "RFID Terminal",
    summary:
      "IoT-based smart canteen concept using RFID and connected monitoring.",
    technologies: ["ESP8266", "RFID", "IoT", "Dashboard"],
    features: [
      "Contactless RFID authentication",
      "UID verification against student records",
      "Automated order intake logging",
      "Real-time administrative telemetry",
      "Wi-Fi connected terminal node"
    ],
    problem:
      "Lunchtime bottlenecks, manual token generation, and cash management delay students and canteen staff during peak campus hours.",
    solution:
      "Engineered an IoT transaction terminal using an RC522 RFID reader coupled with an ESP8266 Wi-Fi module to authenticate student cards instantly, verify account status, and transmit meal logs directly to a central monitoring dashboard.",
    role: "IoT Prototyper & Embedded Developer",
    result:
      "Drastically reduced transaction turnaround time from minutes to sub-second card taps.",
    architecture: [
      { step: "01", name: "Card Tap", desc: "Student taps 13.56MHz RFID card on terminal" },
      { step: "02", name: "RC522 Read", desc: "SPI protocol transmits UID to ESP8266" },
      { step: "03", name: "Wi-Fi API Post", desc: "Encrypted payload sent over local network" },
      { step: "04", name: "Ledger Verification", desc: "Account balance check & transaction recording" },
      { step: "05", name: "Dashboard Monitor", desc: "Live terminal view for canteen administration" }
    ],
    github: "https://github.com/arifshekh291172-web/arif-portfolio/tree/main/projects/06-smart-canteen-iot",
    liveDemo: null,
    accentColor: "#f59e0b"
  },
  {
    id: "right-source-hr",
    title: "Right Source HR",
    category: "fullstack",
    categoryName: "Full Stack",
    badge: "Web Platform",
    summary:
      "A recruitment platform concept with job listings, applications and administrative job approval workflows.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express",
      "MongoDB"
    ],
    features: [
      "Dynamic vacancy directory with category filters",
      "Comprehensive candidate application pipeline",
      "Document/resume submission storage",
      "Administrative review and job approval workflow",
      "Modular REST API architecture"
    ],
    problem:
      "Hiring managers struggle with unorganized email submissions and lack a centralized approval mechanism for newly created job requisitions.",
    solution:
      "Built a full-stack recruiting platform utilizing Node.js, Express, and MongoDB that separates public candidate applications from an authenticated administrative dashboard for requisition vetting and approval.",
    role: "Full-Stack Web Developer",
    result:
      "Centralized candidate pipeline handling job applications and structured administrative approvals.",
    architecture: [
      { step: "01", name: "Candidate Submission", desc: "Form input and application submission" },
      { step: "02", name: "REST Endpoint", desc: "Express.js validation and payload parsing" },
      { step: "03", name: "MongoDB Ingestion", desc: "Document storage with candidate schema" },
      { step: "04", name: "Admin Portal", desc: "Requisition vetting and candidate status updates" },
      { step: "05", name: "Notification State", desc: "Pipeline stage updates for applicants" }
    ],
    github: "https://github.com/arifshekh291172-web/arif-portfolio/tree/main/projects/07-right-source-hr",
    liveDemo: null,
    accentColor: "#6366f1"
  },
  {
    id: "arif-software-studio",
    title: "Arif Software Studio",
    category: "fullstack",
    categoryName: "Full Stack",
    badge: "Client Studio",
    summary:
      "A professional full-stack service platform concept showcasing software development services and projects.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    features: [
      "Modular software development service catalog",
      "Interactive consultation request pipeline",
      "Modern dark glassmorphic interface",
      "RESTful inquiry submission backend",
      "Responsive cross-device layout"
    ],
    problem:
      "Clients seeking custom AI, vision, or full-stack software need a unified, transparent showcase of technical capabilities and project delivery offerings.",
    solution:
      "Developed a modern web application leveraging React components, responsive layouts, and an Express/MongoDB backend service to present engineering services and capture qualified project inquiries.",
    role: "Full-Stack Architect & UI Designer",
    result:
      "High-converting digital presence featuring interactive service breakdowns and direct project intake.",
    architecture: [
      { step: "01", name: "Client Discovery", desc: "Service browsing across AI, Full-Stack, IoT" },
      { step: "02", name: "Inquiry Form", desc: "Project scoping requirements input" },
      { step: "03", name: "Express API Endpoint", desc: "Sanitization and message serialization" },
      { step: "04", name: "MongoDB Persistence", desc: "Client inquiry and timeline record storage" },
      { step: "05", name: "Confirmation Dispatch", desc: "Instant acknowledgement status feedback" }
    ],
    github: "https://github.com/arifshekh291172-web/arif-portfolio/tree/main/projects/08-arif-software-studio",
    liveDemo: null,
    accentColor: "#06b6d4"
  }
];

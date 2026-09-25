export const skillCategories = [
  { id: "all", name: "All Technologies" },
  { id: "ai-ml", name: "AI & Machine Learning" },
  { id: "vision", name: "Computer Vision" },
  { id: "programming", name: "Programming" },
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "database", name: "Databases" },
  { id: "iot", name: "IoT & Hardware" },
  { id: "tools", name: "Tools & DevOps" },
];

export const skillsData = [
  // AI & MACHINE LEARNING
  {
    name: "Python",
    category: "ai-ml",
    categoryName: "AI & Machine Learning",
    description: "Primary programming language for computational data modeling, algorithms, and pipelines.",
    highlight: "Core Language",
    icon: "Code2",
    color: "#38bdf8"
  },
  {
    name: "Machine Learning",
    category: "ai-ml",
    categoryName: "AI & Machine Learning",
    description: "Supervised and unsupervised learning, regression, classification, model evaluation.",
    highlight: "Scikit-Learn",
    icon: "Brain",
    color: "#818cf8"
  },
  {
    name: "Deep Learning",
    category: "ai-ml",
    categoryName: "AI & Machine Learning",
    description: "Neural network structures, multi-layer perceptrons, forward & backpropagation.",
    highlight: "Neural Networks",
    icon: "Network",
    color: "#c084fc"
  },
  {
    name: "Generative AI",
    category: "ai-ml",
    categoryName: "AI & Machine Learning",
    description: "Harnessing Large Language Models, prompt crafting, and context augmentation.",
    highlight: "LLMs & GenAI",
    icon: "Sparkles",
    color: "#f472b6"
  },
  {
    name: "NLP",
    category: "ai-ml",
    categoryName: "AI & Machine Learning",
    description: "Natural Language Processing, tokenization, semantic similarity, and embeddings.",
    highlight: "Text Analytics",
    icon: "MessageSquare",
    color: "#38bdf8"
  },
  {
    name: "RAG Architecture",
    category: "ai-ml",
    categoryName: "AI & Machine Learning",
    description: "Retrieval-Augmented Generation for grounded question answering from enterprise data.",
    highlight: "Document Retrieval",
    icon: "Layers",
    color: "#22d3ee"
  },
  {
    name: "LangChain",
    category: "ai-ml",
    categoryName: "AI & Machine Learning",
    description: "Chaining prompts, document loaders, vector stores, and memory abstractions.",
    highlight: "Framework",
    icon: "Workflow",
    color: "#34d399"
  },
  {
    name: "Vector Databases",
    category: "ai-ml",
    categoryName: "AI & Machine Learning",
    description: "Indexing and similarity search using Euclidean and Cosine vector mathematics.",
    highlight: "Chroma & FAISS",
    icon: "Database",
    color: "#fbbf24"
  },
  {
    name: "Gemini API",
    category: "ai-ml",
    categoryName: "AI & Machine Learning",
    description: "Integrating Google's multimodal AI models for reasoning and text generation.",
    highlight: "Multimodal AI",
    icon: "Bot",
    color: "#60a5fa"
  },

  // COMPUTER VISION
  {
    name: "OpenCV",
    category: "vision",
    categoryName: "Computer Vision",
    description: "Image processing, color thresholding, contour detection, and frame transformations.",
    highlight: "Vision Core",
    icon: "Eye",
    color: "#f87171"
  },
  {
    name: "MediaPipe",
    category: "vision",
    categoryName: "Computer Vision",
    description: "Google's real-time ML pipeline for landmark localization and hand mesh detection.",
    highlight: "Landmark Tracking",
    icon: "ScanFace",
    color: "#fb923c"
  },
  {
    name: "Image Processing",
    category: "vision",
    categoryName: "Computer Vision",
    description: "Gaussian blur, morphology, edge detection, filtering, and pixel manipulation.",
    highlight: "Image Analytics",
    icon: "Camera",
    color: "#facc15"
  },
  {
    name: "Hand Tracking",
    category: "vision",
    categoryName: "Computer Vision",
    description: "Detecting 21 3D hand landmarks in real time for touchless interaction models.",
    highlight: "Kinematic Tracking",
    icon: "Hand",
    color: "#4ade80"
  },
  {
    name: "Object Detection",
    category: "vision",
    categoryName: "Computer Vision",
    description: "Identifying and localizing target classes within video streams and static frames.",
    highlight: "Spatial Inference",
    icon: "Crosshair",
    color: "#2dd4bf"
  },
  {
    name: "Gesture Recognition",
    category: "vision",
    categoryName: "Computer Vision",
    description: "Translating finger gestures and hand geometries into actionable system events.",
    highlight: "HCI Gestures",
    icon: "Activity",
    color: "#38bdf8"
  },

  // PROGRAMMING
  {
    name: "Python",
    category: "programming",
    categoryName: "Programming",
    description: "Data structures, OOP, functional paradigms, and rapid scripting.",
    highlight: "Advanced",
    icon: "Terminal",
    color: "#60a5fa"
  },
  {
    name: "JavaScript",
    category: "programming",
    categoryName: "Programming",
    description: "ES6+, asynchronous event loop, DOM manipulation, and dynamic client logic.",
    highlight: "Modern ES6+",
    icon: "Code",
    color: "#fde047"
  },
  {
    name: "HTML5",
    category: "programming",
    categoryName: "Programming",
    description: "Semantic document architecture, accessibility standards, and SEO markup.",
    highlight: "Semantic Web",
    icon: "FileCode",
    color: "#fb923c"
  },
  {
    name: "CSS3",
    category: "programming",
    categoryName: "Programming",
    description: "Modern responsive grid, flexbox layout, CSS custom properties, and animations.",
    highlight: "Responsive UI",
    icon: "Palette",
    color: "#38bdf8"
  },

  // FRONTEND
  {
    name: "React",
    category: "frontend",
    categoryName: "Frontend",
    description: "Component lifecycle, custom hooks, virtual DOM, and modular UI engineering.",
    highlight: "Component Driven",
    icon: "Atom",
    color: "#22d3ee"
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    categoryName: "Frontend",
    description: "Utility-first design system for scalable, aesthetic, responsive dark UI.",
    highlight: "Design Systems",
    icon: "Sparkle",
    color: "#06b6d4"
  },
  {
    name: "Bootstrap",
    category: "frontend",
    categoryName: "Frontend",
    description: "Grid systems and rapid UI prototyping for web dashboards.",
    highlight: "Responsive Grid",
    icon: "Layout",
    color: "#a855f7"
  },
  {
    name: "Material UI",
    category: "frontend",
    categoryName: "Frontend",
    description: "Google Material Design components with structured design tokens.",
    highlight: "Design Language",
    icon: "Component",
    color: "#3b82f6"
  },

  // BACKEND
  {
    name: "Node.js",
    category: "backend",
    categoryName: "Backend",
    description: "Non-blocking event-driven runtime for high-throughput server backends.",
    highlight: "Runtime Engine",
    icon: "Server",
    color: "#22c55e"
  },
  {
    name: "Express.js",
    category: "backend",
    categoryName: "Backend",
    description: "RESTful API routing, middleware architecture, and controller logic.",
    highlight: "REST APIs",
    icon: "Radio",
    color: "#94a3b8"
  },
  {
    name: "Flask",
    category: "backend",
    categoryName: "Backend",
    description: "Lightweight Python microframework for exposing AI models and ML endpoints.",
    highlight: "Microservices",
    icon: "Flame",
    color: "#e2e8f0"
  },
  {
    name: "Django",
    category: "backend",
    categoryName: "Backend",
    description: "High-level Python web framework with built-in ORM and authentication.",
    highlight: "Full-Stack Python",
    icon: "Boxes",
    color: "#10b981"
  },

  // DATABASE
  {
    name: "MongoDB",
    category: "database",
    categoryName: "Databases",
    description: "Document-oriented NoSQL database for flexible and nested data schemas.",
    highlight: "NoSQL Core",
    icon: "Database",
    color: "#4ade80"
  },
  {
    name: "MongoDB Atlas",
    category: "database",
    categoryName: "Databases",
    description: "Cloud database deployment, clustering, automated backups, and indexes.",
    highlight: "Cloud Database",
    icon: "Cloud",
    color: "#16a34a"
  },
  {
    name: "ChromaDB",
    category: "database",
    categoryName: "Databases",
    description: "AI-native open-source embedding database for semantic RAG lookups.",
    highlight: "Embedding Store",
    icon: "Binary",
    color: "#e879f9"
  },
  {
    name: "FAISS",
    category: "database",
    categoryName: "Databases",
    description: "Facebook AI Similarity Search library for dense vector clustering and searching.",
    highlight: "Vector Search",
    icon: "Search",
    color: "#38bdf8"
  },

  // TOOLS
  {
    name: "Git",
    category: "tools",
    categoryName: "Tools & DevOps",
    description: "Distributed version control, branching strategies, and commit hygiene.",
    highlight: "Version Control",
    icon: "GitBranch",
    color: "#f97316"
  },
  {
    name: "GitHub",
    category: "tools",
    categoryName: "Tools & DevOps",
    description: "Code hosting, repository management, releases, and issue tracking.",
    highlight: "Collaboration",
    icon: "Github",
    color: "#e2e8f0"
  },
  {
    name: "VS Code",
    category: "tools",
    categoryName: "Tools & DevOps",
    description: "Primary IDE configured with Python interpreters, linters, and debugging tools.",
    highlight: "Development IDE",
    icon: "Monitor",
    color: "#3b82f6"
  },
  {
    name: "Postman",
    category: "tools",
    categoryName: "Tools & DevOps",
    description: "Testing API contracts, crafting payload requests, and verifying responses.",
    highlight: "API Testing",
    icon: "Send",
    color: "#fb923c"
  },
  {
    name: "Termux",
    category: "tools",
    categoryName: "Tools & DevOps",
    description: "Android Linux terminal emulation for mobile script execution and server test.",
    highlight: "Linux Shell",
    icon: "TerminalSquare",
    color: "#a3e635"
  },
  {
    name: "Vite & npm",
    category: "tools",
    categoryName: "Tools & DevOps",
    description: "Fast module bundler, hot module replacement, and dependency package manager.",
    highlight: "Build Pipeline",
    icon: "Zap",
    color: "#a855f7"
  },

  // IOT
  {
    name: "ESP32",
    category: "iot",
    categoryName: "IoT & Hardware",
    description: "Dual-core microcontroller with integrated Wi-Fi and Bluetooth for edge computation.",
    highlight: "Microcontroller",
    icon: "Cpu",
    color: "#38bdf8"
  },
  {
    name: "ESP8266",
    category: "iot",
    categoryName: "IoT & Hardware",
    description: "Cost-effective Wi-Fi microchip module for wireless telemetry and remote control.",
    highlight: "Wi-Fi Module",
    icon: "Wifi",
    color: "#818cf8"
  },
  {
    name: "Arduino",
    category: "iot",
    categoryName: "IoT & Hardware",
    description: "Prototyping platform for GPIO manipulation, analog sensing, and serial protocol.",
    highlight: "Embedded Prototyping",
    icon: "CircuitBoard",
    color: "#2dd4bf"
  },
  {
    name: "Sensor Systems",
    category: "iot",
    categoryName: "IoT & Hardware",
    description: "Interfacing soil moisture, DHT11/22, LDR light sensors, flame detectors, and relays.",
    highlight: "Telemetry & Actuation",
    icon: "Sliders",
    color: "#fbbf24"
  },
  {
    name: "Blynk",
    category: "iot",
    categoryName: "IoT & Hardware",
    description: "Low-latency mobile IoT dashboards for real-time sensor visualization and controls.",
    highlight: "Mobile IoT",
    icon: "Smartphone",
    color: "#34d399"
  },
  {
    name: "MQTT Protocol",
    category: "iot",
    categoryName: "IoT & Hardware",
    description: "Lightweight publish-subscribe network protocol for telemetry in constrained devices.",
    highlight: "IoT Messaging",
    icon: "RadioReceiver",
    color: "#ec4899"
  }
];

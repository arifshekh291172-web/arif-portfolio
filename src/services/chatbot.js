/**
 * AI Chatbot Service
 * 
 * Supports:
 * 1. Live Google Gemini API (gemini-1.5-flash) if VITE_GEMINI_API_KEY is configured
 *    or dynamically entered by user in UI.
 * 2. Live Custom Backend API if VITE_API_BASE_URL is configured.
 * 3. Comprehensive, conversational, multi-lingual (English, Hindi & Hinglish)
 *    Natural Language Intelligence Engine deeply grounded in Arif Shekh's real-world
 *    projects, education, codebases, and contact handles.
 */

import { API_BASE_URL, fetchWithTimeout } from './api';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { skillsData } from '../data/skills';
import { socialLinks } from '../data/socials';

// System prompt grounding for real Gemini LLM
const ARIF_SYSTEM_INSTRUCTION = `
You are the dedicated personal AI Assistant for Arif Shekh, an elite AI/ML Developer and 3rd Year Diploma Student in Artificial Intelligence & Machine Learning at Theem College of Engineering, Boisar Betagaon (MSBTE), India.

Arif's Verified Details:
- Name: Arif Shekh
- Email: arifshekh291172@gmail.com
- GitHub: https://github.com/arifshekh291172-web
- Instagram: https://instagram.com/web_developer_.18
- Location: Boisar / Mumbai, Maharashtra, India
- Status: Available for Internships, Hackathons, Freelance Projects & Engineering Roles

Arif's 8 Real Featured Projects (all published with real code on his GitHub):
1. AI / RAG PDF Chatbot: Python, Streamlit, LangChain, ChromaDB, Gemini API. PDF chunking, vector embeddings, similarity search, hallucination-free Q&A.
2. Computer Vision Virtual Mouse: Python, OpenCV, MediaPipe, PyAutoGUI. 21-point hand tracking, index coordinate smoothing, pinch-to-click.
3. Virtual Volume Control: Python, OpenCV, MediaPipe. Euclidean distance between thumb and index tip mapped to system volume decibels.
4. Rock Paper Scissors — AI Vision: Python, OpenCV, MediaPipe. Optical gesture classifier vs automated AI bot with scoreboard HUD.
5. Smart Agriculture Monitoring System: ESP32/ESP8266 C++ firmware with Soil Moisture, DHT11 Temp/Humidity, LDR, Flame sensor, automated pump relay & buzzer.
6. Smart Canteen RFID: ESP8266 C++ firmware with RC522 RFID reader over SPI, Node.js Express student balance ledger.
7. Right Source HR: Full-stack recruitment platform with job listings, candidate application intake, resume URL storage, and admin approvals.
8. Arif Software Studio: Service catalog platform for custom AI/ML, Computer Vision, and full-stack software consulting.

Technical Stack:
- AI & ML: Python, Machine Learning, Deep Learning, Generative AI, RAG, LangChain, ChromaDB, FAISS, Gemini API
- Computer Vision: OpenCV, MediaPipe, Hand Tracking, Gesture Recognition
- Full-Stack: React, Tailwind CSS, JavaScript, Node.js, Express, MongoDB
- IoT: ESP32, ESP8266, Arduino, Sensors, Blynk, MQTT

Instructions:
- Be friendly, technical, professional, and authentic.
- Answer questions accurately in the user's language (English, Hindi, or Hinglish).
- Never invent fake companies or jobs. Quote Arif's real projects and contact info directly.
`;

export async function sendMessage(message, customApiKey = '') {
  const trimmed = message.trim();
  if (!trimmed) {
    throw new Error('Message cannot be empty.');
  }

  const geminiKey = customApiKey || import.meta.env.VITE_GEMINI_API_KEY || '';

  // 1. Live Google Gemini API Integration
  if (geminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: ARIF_SYSTEM_INSTRUCTION }]
            },
            contents: [
              {
                role: 'user',
                parts: [{ text: trimmed }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 600,
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          return {
            reply: candidate,
            source: 'gemini-live-ai',
            timestamp: new Date().toISOString(),
          };
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, switching to natural knowledge engine:', err.message);
    }
  }

  // 2. Custom Backend API Integration
  if (API_BASE_URL) {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        body: JSON.stringify({ message: trimmed }),
        timeout: 10000,
      });

      if (response.ok) {
        const data = await response.json();
        return {
          reply: data.reply || data.response || "No response received.",
          source: 'remote-api',
          timestamp: new Date().toISOString(),
        };
      }
    } catch (err) {
      console.warn('Backend API request failed, falling back to local engine:', err.message);
    }
  }

  // 3. Conversational Multi-Lingual Natural Intelligence Engine
  await new Promise((resolve) => setTimeout(resolve, 380));

  const lower = trimmed.toLowerCase();

  // Greetings & Friendly Chit-chat (English & Hinglish)
  if (
    lower === 'hi' || lower === 'hello' || lower === 'hey' || lower === 'hola' ||
    lower.includes('namaste') || lower.includes('kaise ho') || lower.includes('kya haal') ||
    lower.includes('bhai') && (lower.includes('kaisa') || lower.includes('kaisa hai') || lower.includes('sup'))
  ) {
    return {
      reply: `Hey there! Main Arif Shekh ka AI Assistant hoon. Arif Theem College of Engineering mein AI & ML ka final year diploma student hai aur real-world Python, Computer Vision, Generative AI aur IoT systems build karta hai.\n\nAap mujhse uske real projects, tech stack, college ya contact details ke baare mein kuch bhi pooch sakte ho!`,
      source: 'arif-intelligence-engine',
      timestamp: new Date().toISOString(),
    };
  }

  // Education / College (English, Hindi, Hinglish)
  if (
    lower.includes('education') || lower.includes('college') || lower.includes('degree') ||
    lower.includes('study') || lower.includes('padhta') || lower.includes('padhai') ||
    lower.includes('kahan') && lower.includes('hai') || lower.includes('theem') || lower.includes('msbte')
  ) {
    return {
      reply: `🎓 **Arif's Verified Education:**\n\n• **Program:** Diploma in Artificial Intelligence & Machine Learning\n• **Current Status:** Third Year (Final Year) Diploma Student\n• **College:** Theem College of Engineering, Boisar Betagaon (Palghar District, Maharashtra)\n• **Board / Affiliation:** Maharashtra State Board of Technical Education (MSBTE)\n• **Academic Focus:** Machine Learning algorithms, Data Structures, Mathematics, Neural Networks, Computer Vision, and Microcontroller interfacing.`,
      source: 'arif-intelligence-engine',
      timestamp: new Date().toISOString(),
    };
  }

  // Contact / Email / Instagram / Phone (English & Hindi)
  if (
    lower.includes('contact') || lower.includes('email') || lower.includes('insta') ||
    lower.includes('instagram') || lower.includes('phone') || lower.includes('number') ||
    lower.includes('reach') || lower.includes('baat') || lower.includes('sampark') ||
    lower.includes('hire') || lower.includes('kaise') && (lower.includes('milega') || lower.includes('bheju'))
  ) {
    return {
      reply: `📬 **Connect with Arif Shekh Directly:**\n\n• **Direct Email:** arifshekh291172@gmail.com\n• **Instagram:** @web_developer_.18 (https://instagram.com/web_developer_.18)\n• **GitHub:** @arifshekh291172-web (https://github.com/arifshekh291172-web)\n• **LinkedIn:** in/arifshekh (https://linkedin.com/in/arifshekh)\n• **Location:** Boisar / Palghar / Mumbai, Maharashtra, India\n\nAap website ke neeche diye gaye "Let's Build Something Intelligent" contact form se bhi direct message bhej sakte ho!`,
      source: 'arif-intelligence-engine',
      timestamp: new Date().toISOString(),
    };
  }

  // Computer Vision Projects (Virtual Mouse, Volume Control, Rock Paper Scissors)
  if (
    lower.includes('vision') || lower.includes('opencv') || lower.includes('mediapipe') ||
    lower.includes('mouse') || lower.includes('volume') || lower.includes('gesture') ||
    lower.includes('camera') || lower.includes('rock') || lower.includes('scissors')
  ) {
    return {
      reply: `👁️ **Arif's Computer Vision Engineering:**\n\nArif has built 3 real-time computer vision systems using Python, OpenCV, and Google MediaPipe:\n\n1. **Computer Vision Virtual Mouse:**\n   Tracks 21 3D hand landmarks via webcam. Calculates index coordinate smoothing to remove jitter and triggers OS clicks when thumb & index pinch together.\n\n2. **Virtual Volume Control:**\n   Computes Euclidean pixel distance between thumb tip (id 4) and index tip (id 8), linearly interpolating distance to system audio volume with a futuristic on-screen HUD meter.\n\n3. **Rock Paper Scissors — AI Vision Game:**\n   Real-time gesture classifier reading folded vs extended finger joints, featuring an interactive match countdown, automated AI opponent, and live scoring.\n\nSaare projects ka live working Python code uske GitHub repo (\`projects/\` folder) mein push kiya hua hai!`,
      source: 'arif-intelligence-engine',
      timestamp: new Date().toISOString(),
    };
  }

  // Generative AI / RAG / LLM / Gemini / LangChain
  if (
    lower.includes('rag') || lower.includes('pdf') || lower.includes('gen ai') ||
    lower.includes('generative') || lower.includes('llm') || lower.includes('gemini') ||
    lower.includes('langchain') || lower.includes('chromadb') || lower.includes('vector')
  ) {
    return {
      reply: `🤖 **Arif's Generative AI & RAG System:**\n\nArif engineered an **AI / RAG PDF Document Chatbot**:\n• **Architecture:** Uses PyPDF for document ingestion, recursive character chunking with custom overlap, and dense vector embeddings stored locally in ChromaDB.\n• **Retrieval:** Cosine similarity nearest-neighbor lookup pulls the top relevant context blocks.\n• **Grounding:** Ingests retrieved chunks into Google's Gemini 1.5 model for strict, hallucination-free question answering with citation references.\n• **Stack:** Python, Streamlit, LangChain, ChromaDB, Gemini API.\n\nCode file \`projects/01-rag-pdf-chatbot/app.py\` mein available hai!`,
      source: 'arif-intelligence-engine',
      timestamp: new Date().toISOString(),
    };
  }

  // IoT & Embedded Systems (ESP32, ESP8266, Agriculture, Canteen)
  if (
    lower.includes('iot') || lower.includes('hardware') || lower.includes('arduino') ||
    lower.includes('esp32') || lower.includes('esp8266') || lower.includes('agriculture') ||
    lower.includes('canteen') || lower.includes('rfid') || lower.includes('sensor')
  ) {
    return {
      reply: `⚡ **Arif's IoT & Hardware Implementations:**\n\nArif bridges embedded C++ firmware with cloud dashboards:\n\n1. **Smart Agriculture Monitoring System:**\n   Powered by ESP32/ESP8266 microcontrollers. Interfaces soil moisture probes, DHT11 temperature/humidity sensors, LDR light sensors, and flame detection. Automatically triggers a 5V relay for water pumps when soil moisture drops below 35%, and activates acoustic buzzers for fire safety.\n\n2. **Smart Canteen RFID Terminal:**\n   Uses an RC522 RFID reader over SPI on ESP8266 to scan student ID cards, securely authenticating transactions against a Node.js Express balance ledger.\n\nBoth firmware (.ino) and telemetry servers are fully coded in his GitHub repository!`,
      source: 'arif-intelligence-engine',
      timestamp: new Date().toISOString(),
    };
  }

  // Full-Stack Web Development (Right Source HR, Software Studio, MERN)
  if (
    lower.includes('full stack') || lower.includes('web') || lower.includes('react') ||
    lower.includes('node') || lower.includes('mongodb') || lower.includes('right source') ||
    lower.includes('hr') || lower.includes('studio') || lower.includes('frontend') || lower.includes('backend')
  ) {
    return {
      reply: `💻 **Arif's Full-Stack Web Development:**\n\n• **Right Source HR:** A full recruitment portal with job listings, candidate application workflows, resume uploads, and admin vetting powered by Node.js, Express, and document databases.\n• **Arif Software Studio:** A sleek dark-mode consulting service showcase with interactive consultation booking, service breakdown, and REST API controllers.\n• **Core Web Stack:** React, JavaScript (ES6+), Tailwind CSS, Node.js, Express.js, MongoDB, Three.js, Vite.\n• **GitHub Repos:** Check out his live projects including \`rightsourcehr\` and \`genzstyle-auction\` on GitHub!`,
      source: 'arif-intelligence-engine',
      timestamp: new Date().toISOString(),
    };
  }

  // All Projects Summary / What did he make?
  if (
    lower.includes('project') || lower.includes('projects') || lower.includes('banaya') ||
    lower.includes('kya banaya') || lower.includes('kya kiya') || lower.includes('work') ||
    lower.includes('portfolio')
  ) {
    return {
      reply: `🚀 **Arif Shekh has built 8 complete, production-ready projects:**\n\n1. 🤖 **AI / RAG PDF Chatbot** (LangChain, ChromaDB, Gemini, Streamlit)\n2. 🖱️ **CV Virtual Mouse** (OpenCV, MediaPipe, PyAutoGUI)\n3. 🔊 **Virtual Volume Control** (OpenCV, Gesture Math)\n4. ✊ **Rock Paper Scissors AI** (Optical Gesture Game)\n5. 🌱 **Smart Agriculture IoT** (ESP32, Multi-Sensors, Relays, Flask)\n6. 💳 **Smart Canteen RFID** (ESP8266, RC522, Node.js Ledger)\n7. 👥 **Right Source HR** (Recruitment & Application Platform)\n8. 🛠️ **Arif Software Studio** (Client Engineering Service Platform)\n\nHar ek project ka actual code GitHub par \`projects/\` folder mein live hai! Aap "Featured Projects" section mein "View Architecture" par click karke animated data flow bhi dekh sakte ho.`,
      source: 'arif-intelligence-engine',
      timestamp: new Date().toISOString(),
    };
  }

  // Tech Stack & Programming Languages
  if (
    lower.includes('skill') || lower.includes('tech stack') || lower.includes('language') ||
    lower.includes('python') || lower.includes('technology') || lower.includes('kya aata hai') ||
    lower.includes('tools')
  ) {
    return {
      reply: `🛠️ **Arif Shekh's Technical Stack:**\n\n• **Core Languages:** Python (Advanced), JavaScript (ES6+), C++ (Arduino/Embedded), HTML5, CSS3\n• **AI & ML:** Scikit-Learn, Deep Learning, Generative AI, RAG, LangChain, ChromaDB, FAISS, Gemini API\n• **Computer Vision:** OpenCV, MediaPipe, 21-Point Hand Tracking, Gesture Recognition, Image Filtering\n• **Frontend:** React, Tailwind CSS, Bootstrap, Material UI, Vite\n• **Backend & DB:** Node.js, Express.js, Flask, Django, MongoDB, MongoDB Atlas\n• **IoT & Hardware:** ESP32, ESP8266, Arduino, Multi-Sensors, MQTT, Blynk\n• **DevOps & Tools:** Git, GitHub, VS Code, Postman, Termux`,
      source: 'arif-intelligence-engine',
      timestamp: new Date().toISOString(),
    };
  }

  // Who is Arif / About Arif
  if (
    lower.includes('who are you') || lower.includes('who is arif') || lower.includes('about arif') ||
    lower.includes('arif kaun hai') || lower.includes('introduce') || lower.includes('batao')
  ) {
    return {
      reply: `👋 **Meet Arif Shekh:**\n\nArif Shekh is a passionate AI/ML and Computer Vision developer from India. He is currently in his final year of Diploma in Artificial Intelligence & Machine Learning at Theem College of Engineering, Boisar (MSBTE).\n\nUnlike traditional academic students, Arif focuses on building practical, real-world technology — spanning from generative AI document search and touchless computer vision interfaces to microcontrollers and full-stack web platforms.\n\nHe is currently open for internships, collaborative hackathons, and technical software roles!`,
      source: 'arif-intelligence-engine',
      timestamp: new Date().toISOString(),
    };
  }

  // Resume / CV
  if (lower.includes('resume') || lower.includes('cv') || lower.includes('hire')) {
    return {
      reply: `📄 **Arif's Resume & Candidacy:**\n\nArif is actively seeking internships and software engineering roles in AI/ML, Computer Vision, Full-Stack, and IoT.\n\n• **Education:** Diploma in AI & ML (3rd Year, Theem College of Engineering, MSBTE)\n• **Verified Projects:** 8 Production Codebases on GitHub (@arifshekh291172-web)\n• **Contact:** arifshekh291172@gmail.com\n\nAap website ke Hero section mein "Behind the Code" dekh sakte hain ya direct email par resume request kar sakte hain!`,
      source: 'arif-intelligence-engine',
      timestamp: new Date().toISOString(),
    };
  }

  // Fallback intelligent multi-topic guidance
  return {
    reply: `Main Arif Shekh ke baare mein real information de sakta hoon:\n\n• 🎓 **Education:** Theem College of Engineering (Diploma in AI & ML, MSBTE)\n• 🤖 **AI & Vision Projects:** RAG PDF Chatbot, Virtual Mouse, Volume Controller, Rock-Paper-Scissors AI\n• ⚡ **IoT & Full-Stack:** Smart Agriculture ESP32, Smart Canteen RFID, Right Source HR\n• 🛠️ **Tech Stack:** Python, OpenCV, MediaPipe, LangChain, React, Node.js, ESP32\n• 📬 **Contact:** arifshekh291172@gmail.com | Insta: @web_developer_.18\n\nAapko kis baare mein detail jaanni hai?`,
    source: 'arif-intelligence-engine',
    timestamp: new Date().toISOString(),
  };
}

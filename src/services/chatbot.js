/**
 * AI Chatbot Service Abstraction
 * Production-ready interface for connecting to a real Python (Flask/FastAPI/LangChain)
 * or Node.js/Express backend.
 *
 * When VITE_API_BASE_URL is defined, it forwards the prompt to `${API_BASE_URL}/api/chat`.
 * Otherwise, it uses an intelligent rule-based knowledge engine grounded solely in
 * Arif Shekh's verified background and projects.
 */

import { API_BASE_URL, fetchWithTimeout } from './api';
import { profileData } from '../data/profile';
import { skillsData } from '../data/skills';
import { projectsData } from '../data/projects';

export async function sendMessage(message) {
  const trimmed = message.trim();
  if (!trimmed) {
    throw new Error('Message cannot be empty.');
  }

  // If a live backend URL is configured, forward the request
  if (API_BASE_URL) {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        body: JSON.stringify({ message: trimmed }),
        timeout: 10000,
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      return {
        reply: data.reply || data.response || "No response received from AI backend.",
        source: 'remote-api',
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      console.warn('Backend API request failed, falling back to local knowledge engine:', err.message);
      // Fallback seamlessly to local verified knowledge base
    }
  }

  // Local knowledge engine (offline fallback)
  // Simulates realistic thinking latency (300-600ms)
  await new Promise((resolve) => setTimeout(resolve, 450));

  const lower = trimmed.toLowerCase();

  // Knowledge matching logic
  if (lower.includes('education') || lower.includes('college') || lower.includes('degree') || lower.includes('study')) {
    return {
      reply: `Arif Shekh is a Third Year Diploma Student in Artificial Intelligence & Machine Learning at ${profileData.about.card.college}, affiliated with ${profileData.about.card.board} in India.`,
      source: 'local-knowledge-base',
      timestamp: new Date().toISOString(),
    };
  }

  if (lower.includes('vision') || lower.includes('opencv') || lower.includes('mediapipe') || lower.includes('gesture') || lower.includes('mouse') || lower.includes('volume')) {
    const visionProjects = projectsData.filter((p) => p.category === 'vision').map((p) => p.title).join(', ');
    return {
      reply: `Arif specializes in Computer Vision using Python, OpenCV, and MediaPipe. His vision portfolio includes:\n• Computer Vision Virtual Mouse (touchless cursor navigation)\n• Virtual Volume Control (gesture-based decibel interpolation)\n• Rock Paper Scissors — AI Vision (real-time optical gesture game)\n\nHe has deep hands-on experience in 21-point hand landmark tracking, coordinate normalization, and real-time camera pipelines.`,
      source: 'local-knowledge-base',
      timestamp: new Date().toISOString(),
    };
  }

  if (lower.includes('rag') || lower.includes('pdf') || lower.includes('gen ai') || lower.includes('generative') || lower.includes('llm') || lower.includes('gemini') || lower.includes('langchain')) {
    return {
      reply: `In Generative AI, Arif engineered an AI / RAG PDF Chatbot utilizing Python, Streamlit, LangChain, ChromaDB, and Google's Gemini API. The system handles recursive document chunking, semantic vector embeddings, nearest-neighbor vector search, and context-augmented answer synthesis.`,
      source: 'local-knowledge-base',
      timestamp: new Date().toISOString(),
    };
  }

  if (lower.includes('iot') || lower.includes('hardware') || lower.includes('arduino') || lower.includes('esp32') || lower.includes('esp8266') || lower.includes('agriculture') || lower.includes('canteen')) {
    return {
      reply: `In IoT & Embedded Systems, Arif works with ESP32, ESP8266, and Arduino microcontrollers. His key projects include:\n• Smart Agriculture Monitoring System: Multi-sensor telemetry (soil moisture, temperature, LDR, flame) with automated relay pump control and buzzer alerts.\n• Smart Canteen: RFID-driven attendance and meal logging with connected dashboards.\nHe utilizes sensor interfacing, GPIO actuation, and MQTT/Wi-Fi communication.`,
      source: 'local-knowledge-base',
      timestamp: new Date().toISOString(),
    };
  }

  if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio') || lower.includes('built')) {
    const projectList = projectsData.map((p) => `• ${p.title} (${p.categoryName})`).join('\n');
    return {
      reply: `Arif has built 8 featured technical projects across AI, Computer Vision, IoT, and Full Stack:\n${projectList}\n\nYou can click on any project card in the Featured Projects section to explore its detailed problem, solution, and architecture diagram!`,
      source: 'local-knowledge-base',
      timestamp: new Date().toISOString(),
    };
  }

  if (lower.includes('tech stack') || lower.includes('technology') || lower.includes('skills') || lower.includes('tools') || lower.includes('python')) {
    return {
      reply: `Arif's core technical stack encompasses:\n• AI/ML: Python, Machine Learning, Deep Learning, Generative AI, LangChain, ChromaDB, FAISS, Gemini API\n• Vision: OpenCV, MediaPipe, Hand Tracking, Gesture Recognition\n• Web & Frontend: React, Tailwind CSS, JavaScript, HTML5, CSS3\n• Backend & DB: Node.js, Express.js, Flask, Django, MongoDB, MongoDB Atlas\n• IoT: ESP32, ESP8266, Arduino, Sensors, Blynk, MQTT`,
      source: 'local-knowledge-base',
      timestamp: new Date().toISOString(),
    };
  }

  if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('reach') || lower.includes('location')) {
    return {
      reply: `Arif is currently available for internships, AI/ML hackathons, freelance projects, and technical engineering roles. You can reach out directly via the Contact section below or connect on GitHub and LinkedIn.`,
      source: 'local-knowledge-base',
      timestamp: new Date().toISOString(),
    };
  }

  if (lower.includes('who are you') || lower.includes('about') || lower.includes('arif')) {
    return {
      reply: `Arif Shekh is an AI/ML developer and Diploma student in Artificial Intelligence & Machine Learning at Theem College of Engineering. He builds practical, real-world solutions across Python, Computer Vision, Generative AI, Full-Stack Web Development, and IoT.`,
      source: 'local-knowledge-base',
      timestamp: new Date().toISOString(),
    };
  }

  // Default intelligent response
  return {
    reply: `I can tell you about Arif Shekh's AI/ML projects (like the RAG PDF Chatbot), Computer Vision systems (Virtual Mouse & Volume Control), IoT solutions (Smart Agriculture & RFID Canteen), full-stack web platforms, or his technical skills and diploma education. What would you like to explore?`,
    source: 'local-knowledge-base',
    timestamp: new Date().toISOString(),
  };
}

/**
 * Arif Software Studio — Professional Engineering Services
 * Author: Arif Shekh (Founder & Full-Stack Architect)
 * Technology: Node.js, Express, JavaScript, HTML5
 */

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Service Catalog
const services = [
  {
    id: "ai-rag",
    title: "Generative AI & RAG Systems",
    category: "Artificial Intelligence",
    description: "Enterprise PDF ingestion, vector search with ChromaDB/FAISS, and grounded Gemini/OpenAI reasoning pipelines.",
    timeline: "2-4 Weeks",
    deliverables: ["Vector Store Architecture", "API Endpoints", "Streamlit/React UI"]
  },
  {
    id: "cv-spatial",
    title: "Computer Vision & Gesture Control",
    category: "Spatial AI",
    description: "Real-time webcam tracking, landmark estimation with OpenCV & MediaPipe, and hardware/desktop automation.",
    timeline: "2-3 Weeks",
    deliverables: ["Camera Pipeline", "Gesture Recognizers", "OS Integration"]
  },
  {
    id: "iot-embedded",
    title: "IoT Firmware & Sensor Networks",
    category: "Hardware",
    description: "ESP32 / ESP8266 microcontrollers, telemetry sensor arrays, MQTT brokers, and remote monitoring dashboards.",
    timeline: "3-5 Weeks",
    deliverables: ["C++ Firmware", "Circuit Schematics", "Cloud Dashboard"]
  },
  {
    id: "fullstack-mern",
    title: "Full-Stack Web Engineering",
    category: "Web Platforms",
    description: "Modern responsive web applications with React, Tailwind CSS, Node.js REST APIs, and MongoDB databases.",
    timeline: "3-6 Weeks",
    deliverables: ["Production Frontend", "Secure Backend API", "Database Schemas"]
  }
];

let clientInquiries = [];

app.get('/api/services', (req, res) => {
  res.json(services);
});

app.post('/api/inquiries', (req, res) => {
  const { clientName, email, serviceId, projectBrief, budget } = req.body;

  if (!clientName || !email || !serviceId) {
    return res.status(400).json({ error: "Please provide client name, email, and selected service." });
  }

  const inquiry = {
    id: clientInquiries.length + 1,
    clientName,
    email,
    serviceId,
    projectBrief: projectBrief || "",
    budget: budget || "Discuss in Call",
    status: "RECEIVED",
    submittedAt: new Date().toISOString()
  };

  clientInquiries.unshift(inquiry);
  console.log(`[STUDIO INQUIRY] New consultation request from ${clientName} (${email}) for ${serviceId}`);

  res.status(201).json({
    success: true,
    message: "Thank you for reaching out to Arif Software Studio. We will schedule a technical discovery call within 24 hours!",
    inquiry
  });
});

app.listen(PORT, () => {
  console.log(`[Arif Software Studio] Server active at http://localhost:${PORT}`);
});

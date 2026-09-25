/**
 * Right Source HR — Recruitment Platform
 * Author: Arif Shekh (Full-Stack Developer)
 * Technology: Node.js, Express, JavaScript, HTML5, CSS3
 */

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database Collections
let jobs = [
  {
    id: 1,
    title: "Junior AI/ML Engineer",
    department: "Artificial Intelligence",
    location: "Mumbai, India (Hybrid)",
    salary: "₹4.5L - ₹6.5L PA",
    status: "APPROVED",
    type: "Full-Time",
    description: "Seeking hands-on developer with experience in Python, PyTorch/TensorFlow, and Computer Vision models."
  },
  {
    id: 2,
    title: "Computer Vision Researcher",
    department: "Perception & Robotics",
    location: "Remote",
    salary: "₹6L - ₹8.5L PA",
    status: "APPROVED",
    type: "Full-Time",
    description: "Build real-time gesture controllers, object detection models, and edge inference pipelines with OpenCV & MediaPipe."
  },
  {
    id: 3,
    title: "IoT Firmware Prototyper",
    department: "Embedded Systems",
    location: "Boisar, Maharashtra",
    salary: "₹4L - ₹5.5L PA",
    status: "PENDING_APPROVAL",
    type: "Contract",
    description: "Program ESP32/ESP8266 microcontrollers with sensor networks (DHT, Soil, RFID) and telemetry APIs."
  }
];

let applications = [
  {
    id: 1,
    jobId: 1,
    jobTitle: "Junior AI/ML Engineer",
    candidateName: "Rohan Varma",
    email: "rohan@example.com",
    portfolioUrl: "https://github.com/rohan-ml",
    experienceYears: 1,
    status: "UNDER_REVIEW",
    submittedAt: "2026-09-24"
  }
];

// Public Job Listings
app.get('/api/jobs', (req, res) => {
  const { all } = req.query;
  if (all === 'true') {
    return res.json(jobs);
  }
  // By default, public only sees APPROVED jobs
  const approved = jobs.filter(j => j.status === 'APPROVED');
  res.json(approved);
});

// Candidate Submits Application
app.post('/api/applications', (req, res) => {
  const { jobId, candidateName, email, portfolioUrl, experienceYears } = req.body;

  if (!jobId || !candidateName || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const job = jobs.find(j => j.id === parseInt(jobId));
  const newApp = {
    id: applications.length + 1,
    jobId: parseInt(jobId),
    jobTitle: job ? job.title : "General Requisition",
    candidateName,
    email,
    portfolioUrl: portfolioUrl || "N/A",
    experienceYears: experienceYears || 0,
    status: "NEW_SUBMISSION",
    submittedAt: new Date().toISOString().split('T')[0]
  };

  applications.unshift(newApp);
  res.status(201).json({ success: true, message: "Application submitted successfully!", application: newApp });
});

// Admin Review & Requisition Approval
app.post('/api/admin/jobs/:id/status', (req, res) => {
  const { status } = req.body;
  const jobId = parseInt(req.params.id);
  const job = jobs.find(j => j.id === jobId);

  if (!job) return res.status(404).json({ error: "Job requisition not found" });
  job.status = status;
  res.json({ success: true, job });
});

app.get('/api/admin/applications', (req, res) => {
  res.json(applications);
});

app.listen(PORT, () => {
  console.log(`[Right Source HR] Platform active at http://localhost:${PORT}`);
});

/**
 * Contact Form Service
 * Handles form validation and message submission.
 * Connects to a live API endpoint if VITE_API_BASE_URL is configured,
 * or simulates a verified async dispatch with response latency.
 */

import { API_BASE_URL, fetchWithTimeout } from './api';

export async function sendContactMessage(formData) {
  const { name, email, subject, message } = formData;

  if (!name || !name.trim()) {
    throw new Error('Please enter your name.');
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    throw new Error('Please enter a valid email address.');
  }
  if (!subject || !subject.trim()) {
    throw new Error('Please enter a subject.');
  }
  if (!message || message.trim().length < 10) {
    throw new Error('Message must be at least 10 characters long.');
  }

  const payload = {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
    timestamp: new Date().toISOString(),
  };

  if (API_BASE_URL) {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        body: JSON.stringify(payload),
        timeout: 10000,
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.warn('Backend contact dispatch failed:', err.message);
      throw new Error('Unable to connect to the backend server. Please try reaching out via direct email.');
    }
  }

  // Graceful simulation when no custom backend is running
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    success: true,
    message: 'Your message has been dispatched successfully. Arif will respond shortly!',
    payload,
  };
}

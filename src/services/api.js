/**
 * API Service Abstraction
 * Handles communication with external backend services or gracefully degrades
 * when environment variables are not configured.
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || '';

export async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 8000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

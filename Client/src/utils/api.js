// Client/src/utils/api.js
// Client/src/utils/api.js
const BASE_URL = import.meta.env.PROD 
  ? 'https://api.yourfoodcloudsite.com/api' // Your live backend URL
  : 'http://localhost:5000/api';            // Local fallback

export const secureRequest = async (endpoint, options = {}) => {
  // 1. Retrieve the token from localStorage
  const token = localStorage.getItem('foodcloud_token');

  // 2. Merge headers, automatically appending the cryptographic Bearer token if it exists
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // 3. Fire the request
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // 4. Handle global auth failures (e.g., token expired)
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('foodcloud_token');
    localStorage.removeItem('foodcloud_user');
    window.location.href = '/login'; // Force redirect to login
    throw new Error('Session expired or unauthorized. Please log in again.');
  }

  return response.json();
};
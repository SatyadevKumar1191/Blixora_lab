// frontend/src/api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'
});

// Attach token automatically
API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
}, err => Promise.reject(err));

// If 401 => force logout (safe redirect)
API.interceptors.response.use(res => res, err => {
  if (err?.response?.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // optional: navigate to login
    window.location.href = '/login';
  }
  return Promise.reject(err);
});

export default API;

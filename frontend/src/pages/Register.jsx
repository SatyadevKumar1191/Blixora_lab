// frontend/src/pages/Register.jsx
import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

function decodeRoleFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload?.role || payload?.user?.role || 'student';
  } catch (e) {
    return 'student';
  }
}

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      const token = res.data?.token;
      if (!token) throw new Error('No token returned');
      localStorage.setItem('token', token);

      // use role from backend if available, otherwise decode from token
      const role = res.data?.user?.role || decodeRoleFromToken(token);
      localStorage.setItem('role', role);

      // show success message from backend
      alert(res.data?.message || 'Registered successfully');

      // redirect to dashboard
      nav('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Register failed');
    }
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-2xl font-semibold mb-4">Create your account</h2>

      <input
        required
        placeholder="Full name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-3 border rounded mb-3 focus:ring-2 focus:ring-indigo-200"
      />

      <input
        required
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full p-3 border rounded mb-3 focus:ring-2 focus:ring-indigo-200"
      />

      <input
        required
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full p-3 border rounded mb-3 focus:ring-2 focus:ring-indigo-200"
      />

      <button
        type="submit"
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Register
      </button>
    </form>
    
  );
}

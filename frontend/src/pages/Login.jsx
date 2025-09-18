import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

function decodeRoleFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload?.role || payload?.user?.role || 'user';
  } catch (e) {
    return 'user';
  }
}

export default function Login(){
  const [form, setForm] = useState({ email: '', password: '' });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await API.post('/auth/login', form);
      const token = res.data?.token;
      if (!token) throw new Error('No token returned');
      localStorage.setItem('token', token);

      // role: prefer response.user.role, fallback to token payload
      const role = res.data?.user?.role || decodeRoleFromToken(token);
      localStorage.setItem('role', role);

      // redirect by role
      if (role === 'admin') {
        nav('/admin');
      } else {
        nav('/dashboard');
      }
    } catch(err){
      alert(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Welcome back</h2>
      <input
        required
        placeholder="Email"
        value={form.email}
        onChange={e=>setForm({...form, email:e.target.value})}
        className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
      <input
        required
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e=>setForm({...form, password:e.target.value})}
        className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
      <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Login
      </button>
    </form>
  );
}


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(){
  const nav = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role') || 'student';

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    nav('/');
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-white/20 rounded-full p-2">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            </svg>
          </div>
          <div className="font-bold text-lg">Blixora Labs</div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/simulations" className="hover:underline">Simulations</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          {role === 'admin' && <Link to="/admin" className="hover:underline">Admin</Link>}

          {!token ? (
            <>
              <Link to="/login" className="px-3 py-1 rounded-md bg-white/20 hover:bg-white/30">Login</Link>
              <Link to="/register" className="px-3 py-1 rounded-md bg-white/20 hover:bg-white/30">Register</Link>
            </>
          ) : (
            <button onClick={logout} className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-600">Logout</button>
          )}
        </nav>
      </div>
    </header>
  );
}

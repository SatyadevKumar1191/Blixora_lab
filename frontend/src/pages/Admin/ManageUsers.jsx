import React, { useEffect, useState } from 'react';
import API from '../../api/axios';

export default function ManageUsers(){
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await API.get('/auth/users');
      setUsers(res.data || []);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to load users');
    } finally { setLoading(false); }
  };

  useEffect(()=>{ fetch(); }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Admin — Manage Users</h2>
      {loading ? <div>Loading...</div> : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="text-center">
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

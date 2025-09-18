import React, { useEffect, useState } from 'react';
import API from '../../api/axios';

export default function ManageSimulations(){
  const [sims, setSims] = useState([]);
  const [form, setForm] = useState({ title:'', category:'', level:'Beginner', duration:'', description:'' });

  const fetch = async () => {
    try {
      const res = await API.get('/simulations');
      setSims(res.data || []);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to load simulations');
    }
  };

  useEffect(()=>{ fetch(); }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await API.post('/simulations', form);
      setForm({ title:'', category:'', level:'Beginner', duration:'', description:'' });
      fetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Create failed');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this simulation?')) return;
    try {
      await API.delete(`/simulations/${id}`);
      fetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Admin — Manage Simulations</h2>

      <form onSubmit={create} className="grid gap-3 grid-cols-1 md:grid-cols-2 bg-white p-4 rounded shadow">
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="p-3 border rounded" required />
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} className="p-3 border rounded" required />
        <select value={form.level} onChange={e=>setForm({...form, level:e.target.value})} className="p-3 border rounded">
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <input placeholder="Duration (e.g. 1h)" value={form.duration} onChange={e=>setForm({...form, duration:e.target.value})} className="p-3 border rounded" />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} className="p-3 border rounded md:col-span-2" />
        <button className="col-span-1 md:col-span-2 px-4 py-2 bg-green-600 text-white rounded">Create simulation</button>
      </form>

      <div className="mt-6 grid gap-4">
        {sims.map(s => (
          <div key={s._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <div className="font-semibold">{s.title}</div>
              <div className="text-sm text-slate-500">{s.category} • {s.level}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>remove(s._id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

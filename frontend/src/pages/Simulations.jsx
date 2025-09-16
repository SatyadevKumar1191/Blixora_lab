// frontend/src/pages/Simulations.jsx
import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import SimCard from '../components/SimCard';

export default function Simulations(){
  const [sims, setSims] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    try{
      setLoading(true);
      const res = await API.get('/simulations', { params: { q }});
      setSims(res.data || []);
    } catch(err) {
      alert(err.response?.data?.message || 'Failed to load simulations');
    } finally { setLoading(false); }
  };

  useEffect(()=>{ fetch(); }, []);

  const handleEnroll = async (simId) => {
    try{
      await API.post('/enrollments/enroll', { simulationId: simId });
      alert('Enrolled! Check Dashboard');
    } catch(err){
      alert(err.response?.data?.message || 'Error during enroll');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex gap-3 mb-6">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search simulations" className="flex-1 border p-3 rounded shadow-sm" />
        <button onClick={fetch} className="px-4 py-2 bg-indigo-600 text-white rounded">Search</button>
      </div>

      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sims.length === 0 ? <div className="text-slate-600">No simulations found.</div> : sims.map(s => <SimCard key={s._id} sim={s} onEnroll={handleEnroll} />)}
        </div>
      )}
    </div>
  );
}

// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import API from '../api/axios';

export default function Dashboard(){
  const [enrolls, setEnrolls] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await API.get('/enrollments/my');
      setEnrolls(res.data || []);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to load enrollments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ fetch(); }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Your Dashboard</h2>

      {loading ? <div>Loading...</div> : enrolls.length === 0 ? (
        <div className="text-slate-600">No enrollments yet. Browse simulations to get started.</div>
      ) : (
        <ul className="space-y-4">
          {enrolls.map(e => (
            <li key={e._id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
              <div>
                <div className="font-semibold text-lg">{e.simulationId?.title || e.simulation?.title}</div>
                <div className="text-sm text-slate-600">{e.simulationId?.description || e.simulation?.shortDesc || ''}</div>
              </div>
              <div className="text-sm font-medium text-indigo-600">{e.status || 'enrolled'}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

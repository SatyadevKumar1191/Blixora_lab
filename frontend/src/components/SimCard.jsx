
import React from 'react';

export default function SimCard({ sim, onEnroll }){
  return (
    <article className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition card-focus">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{sim.title}</h3>
          <p className="text-sm text-slate-600 mt-1">{sim.description || sim.shortDesc || ''}</p>
          <div className="mt-3 text-xs text-slate-500">{sim.category} • {sim.level || sim.difficulty || '—'}</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-slate-500">{sim.duration ? `${sim.duration}` : ''}</div>
        <button onClick={() => onEnroll(sim._id)} className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Enroll
        </button>
      </div>
    </article>
  );
}

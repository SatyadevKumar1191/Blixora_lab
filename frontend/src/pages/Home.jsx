// frontend/src/pages/Home.jsx
import React from 'react';

export default function Home(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      <section className="text-center py-16">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Blixora Labs
        </h1>
        <p className="mt-6 text-lg text-slate-700">
          Interactive simulations for developers — cybersecurity puzzles, AI mini projects, and cloud labs.
        </p>
        <div className="mt-8">
          <a href="/simulations" className="inline-block px-6 py-3 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700">
            Browse Simulations
          </a>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="font-semibold">Learn by Doing</h3>
          <p className="text-sm text-slate-600 mt-2">Hands-on simulations that build practical skills.</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="font-semibold">Track Progress</h3>
          <p className="text-sm text-slate-600 mt-2">See your progress and activity on the dashboard.</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="font-semibold">Build Portfolio</h3>
          <p className="text-sm text-slate-600 mt-2">Complete labs you can showcase to employers.</p>
        </div>
      </section>
    </div>
  );
}

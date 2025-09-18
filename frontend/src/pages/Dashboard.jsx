import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [enrolls, setEnrolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalProgress, setTotalProgress] = useState(0);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const res = await API.get("/enrollments/my");
      setEnrolls(res.data);
      if (res.data.length > 0) {
        const total = res.data.reduce((acc, e) => acc + (e.progress || 0), 0);
        setTotalProgress(Math.round(total / res.data.length));
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load enrollments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  // Simulate auto progress update
  const completeSim = async (id) => {
    try {
      await API.put(`/enrollments/progress/${id}`, { progress: 100, status: "Completed" });
      fetchEnrollments();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">My Dashboard</h2>
      <p className="mb-4">Total Progress: {totalProgress}%</p>
      <div className="grid gap-4">
        {enrolls.map(e => (
          <div key={e._id} className="p-4 bg-white rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{e.simulationId?.title}</h3>
              <p>{e.simulationId?.description}</p>
              <p>Progress: {e.progress || 0}%</p>
              <p>Status: {e.status || "In Progress"}</p>
            </div>
            {e.progress < 100 && <button onClick={()=>completeSim(e._id)} className="px-3 py-1 bg-green-600 text-white rounded">Complete</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

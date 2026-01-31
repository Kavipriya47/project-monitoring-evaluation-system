import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Layout from "../../components/layout/Layout";

export default function StudentDashboard() {

  // ✅ Hooks FIRST
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const loadProjects = useCallback(async () => {
    if (!user) return;

    try {
      const res = await axios.get(
        `https://project-monitoring-evaluation-system.onrender.com/api/student/my/${user.email}`
      );
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const updateStage = async (id, stage) => {
    try {
      await axios.put(
        `https://project-monitoring-evaluation-system.onrender.com/api/student/update/${id}`,
        { stage }
      );
      loadProjects();
    } catch (err) {
      alert("Project is locked by faculty");
    }
  };

  // ✅ Conditional returns AFTER hooks
  if (!user) {
    return (
      <Layout>
        <p className="text-red-600 font-semibold">
          Please login to view your projects.
        </p>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <p className="animate-pulse text-gray-500">
          Loading your projects...
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-2">
        Welcome, {user.name}
      </h1>

      <h2 className="text-xl font-bold mb-6">
        My Projects
      </h2>

      {projects.length === 0 && (
        <p className="text-gray-600">
          No projects submitted yet.
        </p>
      )}

      {projects.map((p) => (
        <div
          key={p._id}
          className="bg-white p-6 rounded shadow mb-6"
        >
          <h2 className="text-lg font-bold mb-2">
            {p.title}
          </h2>

          <p><b>Status:</b> {p.status}</p>

          {/* progress bar */}
          <div className="w-full bg-gray-200 h-4 rounded mt-3">
            <div
              className="bg-blue-600 h-4 rounded"
              style={{ width: `${p.progress}%` }}
            ></div>
          </div>

          <p className="text-sm mt-1">
            {p.progress}% completed
          </p>

          {/* stage update */}
          <div className="mt-4">
            <label className="font-semibold">
              Project Stage
            </label>

            <select
              className="border p-2 mt-1 block w-60"
              value={p.stage}
              disabled={p.locked}
              onChange={(e) =>
                updateStage(p._id, e.target.value)
              }
            >
              <option>Designing</option>
              <option>Database</option>
              <option>Frontend</option>
              <option>Backend</option>
              <option>Deployment</option>
            </select>

            {p.locked && (
              <p className="text-red-600 mt-2 font-semibold">
                🔒 Finalized by faculty
              </p>
            )}
          </div>
        </div>
      ))}
    </Layout>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";

export default function ViewStatus() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/student/my/${user.email}`
        );
        setProjects(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadStatus();
  }, [user.email]);
  


  if (loading) {
    return (
      <Layout>
        <p className="text-gray-600">
          Loading project status...
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">
        Project Status
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
          <h3 className="text-lg font-bold mb-2">
            {p.title}
          </h3>

          <p><b>Stage:</b> {p.stage}</p>
          <p><b>Status:</b> {p.status}</p>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 h-4 rounded mt-2">
            <div
              className="bg-blue-600 h-4 rounded transition-all"
              style={{ width: `${p.progress}%` }}
            ></div>
          </div>

          <p className="mt-1 text-sm text-gray-600">
            {p.progress}% completed
          </p>

          <div className="mt-3">
            <p><b>Marks:</b> {p.marks ?? "-"}</p>
            <p><b>Remarks:</b> {p.remarks || "-"}</p>
          </div>

          {p.locked && (
            <p className="text-red-600 mt-3 font-semibold">
              🔒 Finalized by faculty
            </p>
          )}
        </div>
      ))}
    </Layout>
  );
}

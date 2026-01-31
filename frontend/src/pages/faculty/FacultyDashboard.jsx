import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FacultyDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [projects, setProjects] = useState([]);
  const [marks, setMarks] = useState({});
  const [remarks, setRemarks] = useState({});

  // Load all projects
  const loadProjects = async () => {
    const res = await axios.get(
      "https://project-monitoring-evaluation-system.onrender.com/api/faculty/projects"
    );
    setProjects(res.data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // normal review (marks + remarks)
  const reviewProject = async (id, status) => {
    await axios.put(
      `https://project-monitoring-evaluation-system.onrender.com/api/faculty/review/${id}`,
      {
        marks: marks[id],
        remarks: remarks[id],
        status
      }
    );

    loadProjects();
  };

  // FINAL LOCK
  const finalizeProject = async (id) => {
    await axios.put(
      `https://project-monitoring-evaluation-system.onrender.com/api/faculty/final/${id}`
    );

    loadProjects();
  };

  const badgeColor = (status) => {
    if (status === "approved")
      return "bg-green-100 text-green-700";
    if (status === "rejected")
      return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">
        Faculty Dashboard
      </h1>

      <div className="bg-white p-6 rounded shadow overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Student</th>
              <th className="border p-2">Project</th>
              <th className="border p-2">Stage</th>
              <th className="border p-2">Progress</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Marks</th>
              <th className="border p-2">Remarks</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((p) => (
              <tr key={p._id}>
                <td className="border p-2">{p.studentName}</td>
                <td className="border p-2">{p.title}</td>
                <td className="border p-2">{p.stage}</td>
                <td className="border p-2">{p.progress}%</td>

                <td className="border p-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${badgeColor(
                      p.status
                    )}`}
                  >
                    {p.status}
                  </span>
                </td>

                <td className="border p-2">
                  <input
                    type="number"
                    className="border px-2 py-1 w-20"
                    disabled={p.locked}
                    value={marks[p._id] ?? p.marks ?? ""}
                    onChange={(e) =>
                      setMarks({
                        ...marks,
                        [p._id]: e.target.value
                      })
                    }
                  />
                </td>

                <td className="border p-2">
                  <textarea
                    className="border p-1 w-48"
                    placeholder="Faculty remarks"
                    disabled={p.locked}
                    value={remarks[p._id] ?? p.remarks ?? ""}
                    onChange={(e) =>
                      setRemarks({
                        ...remarks,
                        [p._id]: e.target.value
                      })
                    }
                  />
                </td>

                <td className="border p-2 space-y-1">
                  {!p.locked && (
                    <>
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded mr-1"
                        onClick={() =>
                          reviewProject(p._id, "approved")
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded mr-1"
                        onClick={() =>
                          reviewProject(p._id, "rejected")
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {p.progress >= 90 && !p.locked && (
                    <button
                      onClick={() =>
                        finalizeProject(p._id)
                      }
                      className="bg-black text-white px-3 py-1 rounded"
                    >
                      Finalize
                    </button>
                  )}

                  {p.locked && (
                    <span className="text-xs text-gray-500">
                      Finalized
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

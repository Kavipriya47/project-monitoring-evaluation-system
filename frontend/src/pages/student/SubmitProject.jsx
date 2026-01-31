import axios from "axios";
import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function SubmitProject() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    rollNo: "",
    department: "",
    title: "",
    description: "",
    stage: "Designing"
  });

  const submit = async () => {
    if (
    !form.rollNo ||
    !form.department ||
    !form.title ||
    !form.description
  ) {
    alert("Enter all details to submit");
    return;
  }
    try {
      await axios.post(
        "https://project-monitoring-evaluation-system.onrender.com/api/student/submit",
        {
          ...form,
          studentName: user.name,
          studentEmail: user.email
        }
      );

      alert("Project submitted successfully ✅");

      // reset form
      setForm({
        rollNo: "",
        department: "",
        title: "",
        description: "",
        stage: "Designing"
      });

    } catch (err) {
      if (err.response?.status === 400) {
        alert("This project title is already submitted ❌");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">
        Submit Project
      </h1>

      <div className="bg-white p-6 rounded shadow space-y-3">

        <input
          placeholder="Roll Number"
          className="border p-2 w-full"
          value={form.rollNo}
          onChange={(e) =>
            setForm({ ...form, rollNo: e.target.value })
          }
        />

        <input
          placeholder="Department"
          className="border p-2 w-full"
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
        />

        <input
          placeholder="Project Title"
          className="border p-2 w-full"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          placeholder="Project Description"
          className="border p-2 w-full"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <select
          className="border p-2 w-full"
          value={form.stage}
          onChange={(e) =>
            setForm({ ...form, stage: e.target.value })
          }
        >
          <option>Designing</option>
          <option>Database</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Deployment</option>
        </select>

        <button
          onClick={submit}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Submit Project
        </button>
      </div>
    </Layout>
  );
}
